import React from 'react';

const Projects = () => {
  const containerStyle = {
   // height: '100vh', // 100% of the viewport height
   // overflowY: 'auto', // Enable vertical scrolling if needed
  };

  const contentStyle = {
   // marginBottom: '1800px',
    height: '1800px',
  };

  return (
    <div style={containerStyle}>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <p style={contentStyle}>
          Below are some of my top tier projects which I have done as a detective
        </p>
        {/* End of projects content */}
        <p>Classified</p>
      </div>
    </div>
  );
};

export default Projects;
