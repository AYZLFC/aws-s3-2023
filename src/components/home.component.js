import React from 'react';

const Home = () => (
  <div>
    <h1>Welcome to AnimalSense</h1>
    <h6>Your Ultimate Animal Recognition App</h6>
    <img src={require('../images/animalsense-logo.jpeg')} alt="AnimalSense Logo"  style={{ width: '200px', height: 'auto' }}/>
    <p>AnimalSense is a cutting-edge mobile application that harnesses the power of artificial intelligence and machine
      learning to recognize animals from images and provide users with fascinating and informative details about the
      identified creatures. Developed using state-of-the-art AWS services, including Rekognition, Cognito, S3, Cloud9,
      CodeStar, DaynmoDB, and React. AnimalSense offers a seamless and engaging user experience for all wildlife
      enthusiasts.</p>

    <h2>Key Features:</h2>

    <ol>
      <li>
        <strong>Image-Based Animal Recognition:</strong> With AnimalSense, you can now satisfy your curiosity about any
        animal you encounter. Simply capture an image using your smartphone's camera or upload a picture from your
        gallery, and let the app work its magic. Our advanced AI algorithms, powered by Amazon Rekognition, analyze the
        image instantly, detecting and identifying the animal present.
      </li>

      <li>
        <strong>Informative Details at Your Fingertips:</strong> AnimalSense not only recognizes animals but also
        provides users with a wealth of informative details about the identified creature. Learn about its species,
        habitat, diet, and other interesting facts curated from reliable sources, making each recognition a fascinating
        wildlife encounter.
      </li>

      <li>
        <strong>User-Friendly and Secure:</strong> Your privacy and data security are of utmost importance to us.
        AnimalSense incorporates Amazon Cognito for secure user authentication and access control, ensuring that your
        personal information and app usage are safeguarded at all times.
      </li>

      <li>
        <strong>Robust Backend Powered by AWS:</strong> Behind the scenes, AnimalSense relies on a robust AWS
        infrastructure. Amazon S3 allows seamless storage and retrieval of images, while Amazon DynamoDB efficiently
        manages app statistics and user preferences. The application is developed using AWS Cloud9, providing a
        hassle-free development environment, and AWS CodeStar facilitates smooth deployment and project management.
      </li>

      <li>
        <strong>Intuitive and Responsive Interface:</strong> Experience AnimalSense's intuitive user interface, designed
        with React, providing a smooth and responsive experience across various devices. From amateurs to wildlife
        experts, the app caters to all users with its user-friendly design.
      </li>
    </ol>

    <h2>How AnimalSense Works:</h2>
    <ol>
      <li>
        <strong>Sign Up and Choose Your Plan:</strong> Get started by signing up for AnimalSense. Choose the plan that
        suits your needs, whether it's the Free Tier for basic usage, Professional for advanced features, or Entreprise
        for enterprise-level requirements.
      </li>

      <li>
        <strong>Sign In:</strong> Once you've signed up, log in to your account to access all the app's features and
        personalized settings.
      </li>

      <li>
        <strong>Capture or Upload:</strong> Launch the AnimalSense app and either capture an image of the animal you
        wish to identify or choose an existing photo from your gallery.
      </li>

      <li>
        <strong>Instant Recognition:</strong> The app's powerful AI engine powered by Amazon Rekognition analyzes the
        image and quickly recognizes the animal species, providing an accurate identification.
      </li>

      <li>
        <strong>Explore and Learn:</strong> Discover a world of knowledge about the identified animal. AnimalSense
        gathers information from reputable sources, offering insights into the animal's behavior, habitat, endangered
        status, and much more.
      </li>
    </ol>

    <h2>Join the AnimalSense Community:</h2>
    <p>Become a part of the growing AnimalSense community and embark on a thrilling journey of animal discovery. Whether
      you encounter wildlife during your travels or simply in your backyard, AnimalSense is your trusty companion to
      unravel the wonders of the animal kingdom.</p>

    <h2><a href="/sign-up">Sign Up</a> Today!</h2>
    <p>Get ready to see the world through the eyes of the AnimalSense app. Sign up today to start your adventure in the
      fascinating realm of animal recognition and exploration!</p>
  </div>
);


export default Home;