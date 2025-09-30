'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Theme Colors (Blue/White) ---
const THEME = {
  primary: '#2563eb', // Blue 600
  primaryDark: '#1d4ed8', // Blue 700
  secondary: '#3b82f6', // Blue 500
  danger: '#ef4444', // Red 500
  warning: '#f59e0b', // Amber 500
  cardBg: '#ffffff', // White
};

// --- Reusable UI Functions (Inline Components) ---

const Icons = {
  Logo: (props) => (
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl"
      style={{ background: THEME.primary }}
      {...props}
    >
      🎓
    </div>
  ),
  NavIcon: (props) => (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl"
      style={{ background: THEME.primary }}
      {...props}
    >
      {props.children}
    </div>
  ),
};

const Badge = ({ type, children }) => {
  let colorClasses = '';
  switch (type) {
    case 'success':
      colorClasses = 'bg-blue-100 text-blue-600';
      break;
    case 'warning':
      colorClasses = 'bg-blue-50 text-blue-600';
      break;
    case 'danger':
      colorClasses = 'bg-red-100 text-red-600';
      break;
    case 'info':
      colorClasses = 'bg-blue-100 text-blue-600';
      break;
    default:
      colorClasses = 'bg-blue-50 text-blue-500';
  }
  return <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>{children}</span>;
};

const StatCard = ({ label, value, change, icon, iconColor }) => {
  let iconClass = '';
  let changeColor = 'text-gray-500';
  switch (iconColor) {
    case 'blue':
      iconClass = 'bg-blue-50 text-blue-600';
      changeColor = 'text-blue-600';
      break;
    case 'light':
      iconClass = 'bg-blue-50 text-blue-500';
      changeColor = 'text-blue-500';
      break;
    case 'dark':
      iconClass = 'bg-blue-100 text-blue-700';
      changeColor = 'text-blue-700';
      break;
    case 'red':
      iconClass = 'bg-red-50 text-red-600';
      changeColor = 'text-red-600';
      break;
    default:
      iconClass = 'bg-blue-50 text-blue-600';
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm font-semibold uppercase text-gray-500">{label}</div>
          <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
          <div className={`text-sm font-semibold ${changeColor}`}>{change}</div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconClass}`}>{icon}</div>
      </div>
    </div>
  );
};

const ChartBar = ({ label, percentage, value, colorClass }) => {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    // Animate the bar width after initial render
    const timer = setTimeout(() => {
      setWidth(`${percentage}%`);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Fallback to primary/secondary gradient if no custom color provided
  const bgColor = colorClass || `linear-gradient(90deg, ${THEME.primary}, ${THEME.secondary})`;

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="min-w-[120px] font-semibold text-sm">{label}</div>
      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
        <div
          className="h-full rounded-lg flex items-center justify-end pr-3 text-white font-bold text-sm transition-all duration-1000 ease-in-out"
          style={{ width, background: bgColor }}
        >
          {value || `${percentage}%`}
        </div>
      </div>
    </div>
  );
};


// --- Dashboard Components (Monolithic) ---

const StudentDashboard = ({ onLogout }) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const uploadAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    uploadAreaRef.current.classList.add('border-orange-500', 'bg-orange-50');
  };

  const handleDragLeave = () => {
    uploadAreaRef.current.classList.remove('border-orange-500', 'bg-orange-50');
  };

  const handleFileUpload = useCallback((file) => {
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      setResumeUploaded(false);
      setTimeout(() => {
        setResumeUploaded(true);
      }, 100);
      setTimeout(() => {
        alert('✓ Resume parsed successfully! Your profile has been updated with AI-extracted data.');
      }, 2000);
    } else if (file) {
      alert('Please upload a PDF file (max 5MB).');
    }
    fileInputRef.current.value = null;
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    handleDragLeave();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const applyJob = () => {
    if (window.confirm('Apply to this position? Your mentor will be notified for approval.')) {
      alert('✓ Application submitted! Waiting for mentor approval.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold text-orange-600">
          <Icons.NavIcon>🎓</Icons.NavIcon>
          <span>Student Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-800 font-medium">John Doe</span>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">JD</div>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back, John! 👋</h2>
          <p className="text-base text-gray-500">Track your applications and manage your profile</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Applications" value="12" change="+3 this week" icon="📝" iconColor="blue" />
          <StatCard label="Shortlisted" value="5" change="41.7% rate" icon="✓" iconColor="green" />
          <StatCard label="Interviews" value="2" change="This month" icon="👥" iconColor="orange" />
          <StatCard label="Profile Score" value="85%" change="Complete profile" icon="⭐" iconColor="red" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Resume Upload Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Upload Resume</h3>
            </header>
            <div
              ref={uploadAreaRef}
              className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:border-orange-500 hover:bg-orange-50"
              style={{ borderStyle: 'dashed', borderWidth: '3px' }} // Tailwind doesn't support border-3 dashed
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <div className="text-6xl mb-4 text-orange-500">📄</div>
              <div className="text-lg font-semibold mb-2">Drop your resume here or click to upload</div>
              <div className="text-sm text-gray-500">PDF format, max 5MB</div>
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".pdf" 
                className="hidden" 
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </div>
            {resumeUploaded && (
              <div className="mt-4 transition-opacity duration-500 opacity-100">
                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 font-semibold">
                  ✓ Resume uploaded successfully! AI parsing in progress...
                </div>
              </div>
            )}
          </div>

          {/* Available Opportunities Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Available Opportunities</h3>
            </header>
            <div className="overflow-y-auto max-h-[400px]">
              {/* Job Card 1 */}
              <div className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:translate-x-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-bold mb-1">Software Engineering Intern</div>
                    <div className="text-sm text-gray-500">Tech Corp</div>
                  </div>
                  <Badge type="success">New</Badge>
                </div>
                <div className="flex gap-4 flex-wrap text-sm text-gray-500 my-3">
                  <div className="flex items-center gap-1">💰 ₹30,000/month</div>
                  <div className="flex items-center gap-1">📍 Remote</div>
                  <div className="flex items-center gap-1">⏱️ 6 months</div>
                </div>
                <button onClick={applyJob} className="w-full mt-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition duration-300">
                  Apply Now
                </button>
              </div>
              {/* Job Card 2 */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:translate-x-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-bold mb-1">Data Analyst Internship</div>
                    <div className="text-sm text-gray-500">Analytics Inc</div>
                  </div>
                  <Badge type="info">Featured</Badge>
                </div>
                <div className="flex gap-4 flex-wrap text-sm text-gray-500 my-3">
                  <div className="flex items-center gap-1">💰 ₹25,000/month</div>
                  <div className="flex items-center gap-1">📍 Hybrid</div>
                  <div className="flex items-center gap-1">⏱️ 3 months</div>
                </div>
                <button onClick={applyJob} className="w-full mt-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Applications Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">My Applications</h3>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">Full Stack Developer</td>
                  <td className="px-6 py-4 whitespace-nowrap">WebTech Solutions</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sep 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge type="success">Shortlisted</Badge></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">UI/UX Designer</td>
                  <td className="px-6 py-4 whitespace-nowrap">Creative Studio</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sep 10, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge type="warning">Under Review</Badge></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">Backend Developer</td>
                  <td className="px-6 py-4 whitespace-nowrap">Cloud Systems</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sep 5, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge type="info">Applied</Badge></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


const CoordinatorDashboard = ({ onLogout }) => {
  const chartData = [
    { label: 'Computer Science', percentage: 85 },
    { label: 'Electronics', percentage: 72 },
    { label: 'Mechanical', percentage: 68 },
    { label: 'Civil', percentage: 55 },
  ];

  const pipelineData = [
    { label: 'Applied', value: 450, percentage: 100, color: `linear-gradient(90deg, ${THEME.primary}, #fb923c)` }, // Orange shades
    { label: 'Shortlisted', value: 338, percentage: 75, color: 'linear-gradient(90deg, #10b981, #34d399)' }, // Green shades
    { label: 'Interviewed', value: 225, percentage: 50, color: 'linear-gradient(90deg, #f59e0b, #fcd34d)' }, // Amber/Yellow shades
    { label: 'Selected', value: 135, percentage: 30, color: 'linear-gradient(90deg, #6366f1, #818cf8)' }, // Indigo shades
  ];

  const handleOpportunitySubmit = (e) => {
    e.preventDefault();
    alert('✓ Opportunity posted successfully! Students can now apply.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold text-orange-600">
          <Icons.NavIcon>📊</Icons.NavIcon>
          <span>Coordinator Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-800 font-medium">Dr. Smith</span>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">DS</div>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Analytics Dashboard 📊</h2>
          <p className="text-base text-gray-500">Real-time placement statistics and insights</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Students" value="450" change="Active profiles" icon="👨‍🎓" iconColor="blue" />
          <StatCard label="Placed" value="285" change="63.3% rate" icon="✓" iconColor="green" />
          <StatCard label="Active Drives" value="18" change="+5 this week" icon="🏢" iconColor="orange" />
          <StatCard label="Avg Package" value="8.5L" change="Per annum" icon="💰" iconColor="red" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Department-wise Placement</h3>
            </header>
            <div className="h-72 mt-5">
              {chartData.map(data => (
                <ChartBar key={data.label} label={data.label} percentage={data.percentage} />
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Interview Pipeline</h3>
            </header>
            <div className="h-72 mt-5">
              {pipelineData.map(data => (
                <ChartBar key={data.label} label={data.label} percentage={data.percentage} value={data.value} colorClass={data.color} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Top Talent Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Top Talent</h3>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View All</button>
            </header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GPA</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Skills</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap font-bold">Alice Johnson</td>
                    <td className="px-3 py-3 whitespace-nowrap">Computer Science</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="success">9.2</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">React, Node.js, Python</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap font-bold">Bob Williams</td>
                    <td className="px-3 py-3 whitespace-nowrap">Electronics</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="success">8.9</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">IoT, Embedded Systems</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap font-bold">Carol Davis</td>
                    <td className="px-3 py-3 whitespace-nowrap">Computer Science</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="success">9.0</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">ML, Data Science, AI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Students Needing Guidance Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Students Needing Guidance</h3>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Contact All</button>
            </header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap">David Brown</td>
                    <td className="px-3 py-3 whitespace-nowrap">Mechanical</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="warning">No Experience</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Assign Mentor</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap">Emma Wilson</td>
                    <td className="px-3 py-3 whitespace-nowrap">Civil</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="danger">Incomplete Profile</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Send Reminder</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap">Frank Martinez</td>
                    <td className="px-3 py-3 whitespace-nowrap">Electronics</td>
                    <td className="px-3 py-3 whitespace-nowrap"><Badge type="warning">Low Applications</Badge></td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Schedule Call</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Post New Opportunity Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Post New Opportunity</h3>
          </header>
          <form className="grid gap-4" onSubmit={handleOpportunitySubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Position Title</label>
                <input type="text" placeholder="e.g., Software Engineer Intern" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                <input type="text" placeholder="e.g., Tech Corp" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Stipend (₹/month)</label>
                <input type="number" placeholder="e.g., 30000" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Duration (months)</label>
                <input type="number" placeholder="e.g., 6" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location</label>
                <input type="text" placeholder="e.g., Remote" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Required Skills (comma-separated)</label>
              <input type="text" placeholder="e.g., React, Node.js, MongoDB" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required />
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              <button type="submit" className="px-5 py-3 bg-emerald-500 text-white font-semibold rounded-lg text-base hover:bg-emerald-600 transition duration-300">
                Post Opportunity
              </button>
              <button type="reset" className="px-5 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg text-base hover:bg-gray-200 transition duration-300">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const MentorDashboard = ({ onLogout }) => {
  const [pendingApprovals, setPendingApprovals] = useState(8);

  const approveApplication = (e, studentName) => {
    e.preventDefault();
    if (window.confirm(`Approve application for ${studentName}?`)) {
      setPendingApprovals(prev => prev - 1);
      e.target.disabled = true;
      e.target.textContent = '✓ Approved';
      e.target.closest('tr').classList.add('bg-emerald-50');
      e.target.classList.add('bg-emerald-500', 'hover:bg-emerald-500'); // Keep the color after disabling
      e.target.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
      alert(`✓ Application for ${studentName} approved!`);
    }
  };

  const pendingApps = [
    { name: 'Sarah Connor', position: 'ML Engineer Intern', company: 'AI Solutions', date: 'Sep 28, 2025' },
    { name: 'John Smith', position: 'Frontend Developer', company: 'WebTech', date: 'Sep 27, 2025' },
    { name: 'Lisa Anderson', position: 'Data Analyst', company: 'Analytics Pro', date: 'Sep 26, 2025' },
  ];

  const mentees = [
    { name: 'Alex Turner', status: 'Placed', progress: '100%', badgeType: 'success' },
    { name: 'Maria Garcia', status: 'Interviewing', progress: '75%', badgeType: 'warning' },
    { name: 'James Lee', status: 'Applying', progress: '45%', badgeType: 'info' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold text-orange-600">
          <Icons.NavIcon>👨‍🏫</Icons.NavIcon>
          <span>Mentor Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-800 font-medium">Prof. Anderson</span>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">PA</div>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Mentor Dashboard 👨‍🏫</h2>
          <p className="text-base text-gray-500">Review and approve student applications</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Pending Approvals" value={pendingApprovals} change="Requires action" icon="⏳" iconColor="orange" />
          <StatCard label="Approved" value="42" change="This month" icon="✓" iconColor="green" />
          <StatCard label="Mentees" value="25" change="Active students" icon="👥" iconColor="blue" />
          <StatCard label="Success Rate" value="78%" change="Placement rate" icon="⭐" iconColor="red" />
        </div>

        {/* Pending Application Approvals Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Pending Application Approvals</h3>
            <Badge type="warning">{pendingApprovals} Pending</Badge>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApps.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap font-bold">{app.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{app.position}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{app.company}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => approveApplication(e, app.name)}
                          className="px-3 py-1 bg-emerald-500 text-white font-semibold rounded-lg text-sm hover:bg-emerald-600 transition duration-300"
                        >
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Review</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Mentees Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">My Mentees</h3>
            </header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mentees.map((mentee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">{mentee.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap"><Badge type={mentee.badgeType}>{mentee.status}</Badge></td>
                      <td className="px-3 py-4 whitespace-nowrap">{mentee.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
            </header>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-emerald-500">
                <div className="font-semibold mb-1">Application Approved</div>
                <div className="text-sm text-gray-500">Sarah Connor - ML Engineer at AI Solutions</div>
                <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <div className="font-semibold mb-1">New Application Request</div>
                <div className="text-sm text-gray-500">John Smith - Frontend Developer at WebTech</div>
                <div className="text-xs text-gray-500 mt-1">5 hours ago</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-amber-500">
                <div className="font-semibold mb-1">Profile Updated</div>
                <div className="text-sm text-gray-500">Lisa Anderson added new skills</div>
                <div className="text-xs text-gray-500 mt-1">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const RecruiterDashboard = ({ onLogout }) => {
  const recentApplications = [
    { name: 'Alice Johnson', position: 'Software Engineer', skillsMatch: 95, exp: '2 internships', badgeType: 'success' },
    { name: 'Bob Williams', position: 'Data Analyst', skillsMatch: 78, exp: '1 internship', badgeType: 'warning' },
    { name: 'Carol Davis', position: 'ML Engineer', skillsMatch: 92, exp: '3 projects', badgeType: 'success' },
  ];

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    alert('✓ Feedback submitted successfully!');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold text-orange-600">
          <Icons.NavIcon>🏢</Icons.NavIcon>
          <span>Recruiter Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-800 font-medium">HR Manager</span>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">HR</div>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Recruiter Dashboard 🏢</h2>
          <p className="text-base text-gray-500">Manage job postings and review candidates</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Active Postings" value="5" change="Live positions" icon="📋" iconColor="blue" />
          <StatCard label="Applications" value="127" change="Total received" icon="📨" iconColor="green" />
          <StatCard label="Shortlisted" value="34" change="26.8% rate" icon="✓" iconColor="orange" />
          <StatCard label="Hired" value="12" change="This quarter" icon="⭐" iconColor="red" />
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Recent Applications</h3>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View All</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Skills Match</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap font-bold">{app.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{app.position}</td>
                    <td className="px-3 py-4 whitespace-nowrap"><Badge type={app.badgeType}>{app.skillsMatch}%</Badge></td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{app.exp}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="px-3 py-1 bg-emerald-500 text-white font-semibold rounded-lg text-sm hover:bg-emerald-600 transition duration-300">Shortlist</button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Profile</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Job Postings */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">My Job Postings</h3>
            </header>
            <div className="overflow-y-auto max-h-[400px]">
              {/* Job Posting Card 1 */}
              <div className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:translate-x-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-bold mb-1">Software Engineer Intern</div>
                    <div className="text-sm text-gray-500">Your Company</div>
                  </div>
                  <Badge type="success">Active</Badge>
                </div>
                <div className="flex gap-4 flex-wrap text-sm text-gray-500 my-3">
                  <div className="flex items-center gap-1">📨 45 Applications</div>
                  <div className="flex items-center gap-1">✓ 12 Shortlisted</div>
                  <div className="flex items-center gap-1">📅 Posted 5 days ago</div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Edit</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Applications</button>
                </div>
              </div>
              {/* Job Posting Card 2 */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:translate-x-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-bold mb-1">Data Analyst Intern</div>
                    <div className="text-sm text-gray-500">Your Company</div>
                  </div>
                  <Badge type="success">Active</Badge>
                </div>
                <div className="flex gap-4 flex-wrap text-sm text-gray-500 my-3">
                  <div className="flex items-center gap-1">📨 32 Applications</div>
                  <div className="flex items-center gap-1">✓ 8 Shortlisted</div>
                  <div className="flex items-center gap-1">📅 Posted 3 days ago</div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">Edit</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-200">View Applications</button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Training Feedback Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <header className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Submit Training Feedback</h3>
            </header>
            <form className="grid gap-4" onSubmit={handleSubmitFeedback}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Select Intern</label>
                <select className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required>
                  <option>Choose intern...</option>
                  <option>Alice Johnson</option>
                  <option>Bob Williams</option>
                  <option>Carol Davis</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Performance Rating</label>
                <select className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white" required>
                  <option>Select rating...</option>
                  <option>⭐⭐⭐⭐⭐ Excellent</option>
                  <option>⭐⭐⭐⭐ Very Good</option>
                  <option>⭐⭐⭐ Good</option>
                  <option>⭐⭐ Average</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Feedback</label>
                <textarea 
                  placeholder="Enter detailed feedback..." 
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white min-h-[100px]" 
                  required
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
                  <input type="checkbox" className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                  <span>Mark internship as completed</span>
                </label>
              </div>
              <button type="submit" className="w-full px-5 py-3 bg-emerald-500 text-white font-semibold rounded-lg text-base hover:bg-emerald-600 transition duration-300 mt-2">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Application Component (app/page.jsx) ---

const PlacementPortal = () => {
  const [currentRole, setCurrentRole] = useState(null);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '', role: '' });
  const [isLoginSliding, setIsLoginSliding] = useState(false);

  // Show toast notification when the login form mounts
  useEffect(() => {
    const showToast = (message) => {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-500 opacity-0 z-50';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      // Trigger animation
      setTimeout(() => toast.style.opacity = '1', 100);
      
      // Remove the toast after 5 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
      }, 5000);
    };

    showToast('This is a prototype - any email and password will work!');
  }, []);

  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginDetails.role) {
      alert('Please select a role');
      return;
    }
    
    setIsLoginSliding(true);
    setTimeout(() => {
        setCurrentRole(loginDetails.role);
        setIsLoginSliding(false);
    }, 500); // Match animation duration
  };

  const handleLogout = () => {
    setIsLoginSliding(true);
    setTimeout(() => {
        setCurrentRole(null);
        setLoginDetails({ email: '', password: '', role: '' });
        setIsLoginSliding(false);
    }, 500); // Match animation duration
  };

  // Determine which dashboard to render
  const renderDashboard = () => {
    switch (currentRole) {
      case 'student':
        return <StudentDashboard onLogout={handleLogout} />;
      case 'coordinator':
        return <CoordinatorDashboard onLogout={handleLogout} />;
      case 'mentor':
        return <MentorDashboard onLogout={handleLogout} />;
      case 'recruiter':
        return <RecruiterDashboard onLogout={handleLogout} />;
      default:
        // Login Screen
        const loginCardClass = `bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-500 ease-out ${
            isLoginSliding ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`;

        return (
          <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}>
            <div className={loginCardClass}>
              <header className="text-center mb-8">
                <Icons.Logo />
                <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Placement Portal</h1>
                <p className="text-sm text-gray-500">Centralized placement & internship management</p>
              </header>
              
              <form onSubmit={handleLogin}>
                <div className="mb-5 space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={loginDetails.email}
                    onChange={handleLoginChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <div className="mb-5 space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={loginDetails.password}
                    onChange={handleLoginChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <div className="mb-6 space-y-2">
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700">Select Role</label>
                  <select
                    id="role"
                    value={loginDetails.role}
                    onChange={handleLoginChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-orange-500 transition duration-300 bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Choose your role...</option>
                    <option value="student">Student</option>
                    <option value="coordinator">Placement Coordinator</option>
                    <option value="mentor">Mentor/Faculty</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full p-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-xl text-lg cursor-pointer transition duration-300 hover:scale-[1.01] hover:shadow-xl"
                  disabled={isLoginSliding}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased">
      {renderDashboard()}
    </div>
  );
};

export default PlacementPortal;