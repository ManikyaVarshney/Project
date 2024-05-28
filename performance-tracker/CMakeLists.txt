cmake_minimum_required(VERSION 3.10)
project(PerformanceTracker)

set(CMAKE_CXX_STANDARD 17)

# Add includes for cpp-httplib and jsoncpp
include_directories(vcpkg_installed/x64-windows/include)
link_directories(vcpkg_installed/x64-windows/lib)

add_executable(PerformanceTracker main.cpp)
target_link_libraries(PerformanceTracker httplib jsoncpp)
