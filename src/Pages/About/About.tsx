import { useNavigate } from 'react-router-dom';

const About = () => {
  const nav = useNavigate();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className='text-2xl'>About Us</h1>

      <p>
        Welcome to our platform! We aim to provide seamless card management tools with intuitive
        interfaces and exceptional performance.
      </p>

      <div style={{ marginTop: '20px' }}>
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h2  className='text-2xl'>Our Mission</h2>
          <p>
            Empower users with powerful tools for managing cards with ease, ensuring simplicity,
            security, and scalability.
          </p>
        </div>

        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h2  className='text-2xl'>Why Choose Us</h2>
          <p>
            We combine cutting-edge technology with beautiful design, ensuring that every interaction
            you have with our platform feels effortless.
          </p>
        </div>
      </div>

      <button 
        onClick={() => nav("/signup")} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', fontSize:'20px', color:'blue'}}
      >
        Get Started
      </button>
    </div>
  );
};

export default About;
