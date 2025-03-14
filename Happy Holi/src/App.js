
import './App.css';
import yourImage from '../public/your-image.jpg';
import radheKrishna from '../public/radhe-krishna.jpg';

const HoliWishes = () => {
  return (
    <div className="container">
      <img src={yourImage} alt="Manikya" className="icon" />
      <h1>🌈 Happy Holi 🌈</h1>
      <p>Wishing you a colorful and joyful Holi from <strong>Manikya Varshney</strong>!</p>
      <div className="quote">
        <p>
          मथुरा की खुशबू, गोकुल का हार,<br />
          वृंदावन की सुगंध, बरसाने की फुहार,<br />
          राधा की उम्मीद, कान्हा का प्यार,<br />
          मुबारक हो आपको होली का त्योहार। 🌸🎨
        </p>
      </div>
      <img src={radheKrishna} alt="Radha Krishna" className="radhe-krishna" />
      <div className="colors">
        <div className="color violet"></div>
        <div className="color indigo"></div>
        <div className="color blue"></div>
        <div className="color green"></div>
        <div className="color yellow"></div>
        <div className="color orange"></div>
        <div className="color red"></div>
      </div>
    </div>
  );
};

export default HoliWishes;
