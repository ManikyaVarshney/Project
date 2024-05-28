#include <iostream>
#include <string>
#include <unordered_map>
#include <ctime>
#include <cstdlib>
#include <vector>
#include <numeric>
#include <cpp-httplib/httplib.h>
#include <json/json.h>

using namespace std;
using namespace httplib;
using namespace Json;

class DailyActivity {
private:
    unordered_map<string, int> activity_data;

public:
    void log_activity(string user_id) {
        time_t now = time(0);
        tm* ltm = localtime(&now);
        string date = to_string(1900 + ltm->tm_year) + "-" + to_string(1 + ltm->tm_mon) + "-" + to_string(ltm->tm_mday);
        activity_data[date]++;
    }

    int get_daily_activity(string user_id) {
        time_t now = time(0);
        tm* ltm = localtime(&now);
        string date = to_string(1900 + ltm->tm_year) + "-" + to_string(1 + ltm->tm_mon) + "-" + to_string(ltm->tm_mday);
        return activity_data[date];
    }
};

class ContestPerformance {
private:
    unordered_map<string, int> contest_data;

public:
    void participate_contest(string user_id) {
        int contest_id = rand() % 10 + 1;
        contest_data[to_string(contest_id)]++;
    }

    int get_contest_participation(string user_id) {
        return accumulate(contest_data.begin(), contest_data.end(), 0,
            [](int sum, const pair<string, int>& p) { return sum + p.second; });
    }
};

class LearningProgress {
private:
    unordered_map<string, float> course_progress;

public:
    void update_course_progress(string user_id, string course_id, float progress) {
        course_progress[course_id] = progress;
    }

    float get_course_progress(string user_id) {
        float sum = accumulate(course_progress.begin(), course_progress.end(), 0.0f,
            [](float sum, const pair<string, float>& p) { return sum + p.second; });
        return sum / course_progress.size();
    }
};

struct Platform {
    string name;
    string link;
    int questions_done;
    int contest_rating;
    int current_ranking;
    vector<string> achievements;
};

unordered_map<string, vector<Platform>> user_platforms;

void generate_sample_data(DailyActivity& daily_activity, ContestPerformance& contest_performance, LearningProgress& learning_progress) {
    vector<string> users = {"user1", "user2", "user3"};
    for (string& user_id : users) {
        daily_activity.log_activity(user_id);
        contest_performance.participate_contest(user_id);
        learning_progress.update_course_progress(user_id, "course1", static_cast<float>(rand() % 100));
        learning_progress.update_course_progress(user_id, "course2", static_cast<float>(rand() % 100));

        user_platforms[user_id] = {
            {"LeetCode", "https://leetcode.com/" + user_id, 150, 1200, 500, {"Gold Medal", "Top 10%"}},
            {"Codeforces", "https://codeforces.com/profile/" + user_id, 200, 1400, 300, {"Top 50", "Red Coder"}}
        };
    }
}

Json::Value get_user_platforms(const string& user_id) {
    Json::Value platforms(Json::arrayValue);
    for (const Platform& platform : user_platforms[user_id]) {
        Json::Value p;
        p["name"] = platform.name;
        p["link"] = platform.link;
        p["questions_done"] = platform.questions_done;
        p["contest_rating"] = platform.contest_rating;
        p["current_ranking"] = platform.current_ranking;
        for (const string& achievement : platform.achievements) {
            p["achievements"].append(achievement);
        }
        platforms.append(p);
    }
    return platforms;
}

void fetch_platform_data(Platform& platform) {
    platform.questions_done = rand() % 500;
    platform.contest_rating = rand() % 2000;
    platform.current_ranking = rand() % 1000;
    platform.achievements = {"Achievement1", "Achievement2"};
}

int main() {
    srand(time(0));

    DailyActivity daily_activity;
    ContestPerformance contest_performance;
    LearningProgress learning_progress;

    generate_sample_data(daily_activity, contest_performance, learning_progress);

    Server svr;

    svr.set_base_dir("./html");

    svr.Get("/performance", [&](const Request& req, Response& res) {
        string user_id = req.get_param_value("user");

        int daily_activity_value = daily_activity.get_daily_activity(user_id);
        int contest_participation_value = contest_performance.get_contest_participation(user_id);
        float learning_progress_value = learning_progress.get_course_progress(user_id);

        Json::Value json_data;
        json_data["user"] = user_id;
        json_data["daily_activity"] = daily_activity_value;
        json_data["contest_participation"] = contest_participation_value;
        json_data["learning_progress"] = learning_progress_value;

        Json::Value platforms = get_user_platforms(user_id);
        json_data["platforms"] = platforms;

        res.set_content(json_data.toStyledString(), "application/json");
    });

    svr.Post("/add_platform", [&](const Request& req, Response& res) {
        Json::Value json;
        Json::Reader reader;
        reader.parse(req.body, json);

        string user_id = json["user"].asString();
        string platform_name = json["platform"].asString();
        string profile_link = json["link"].asString();

        Platform new_platform = {platform_name, profile_link, 0, 0, 0, {}};
        fetch_platform_data(new_platform);
        user_platforms[user_id].push_back(new_platform);

        Json::Value result;
        result["success"] = true;
        res.set_content(result.toStyledString(), "application/json");
    });

    cout << "Server running on port 8080..." << endl;
    svr.listen("localhost", 8080);

    return 0;
}
