import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer passionate about web technologies',
    location: 'San Francisco, CA'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Profile</h1>
          <Link to="/" className="back-link">← Back to Home</Link>
        </header>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="avatar-section">
              <div className="avatar-placeholder">
                <span className="avatar-text">JD</span>
              </div>
              <button className="change-avatar-btn">Change Avatar</button>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-number">42</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1.2K</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">89</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn primary">Save Changes</button>
                <button type="button" className="btn secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
