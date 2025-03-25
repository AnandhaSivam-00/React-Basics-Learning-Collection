import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaHome, 
  FaBook, 
  FaTags, 
  FaProjectDiagram, 
  FaUsers, 
  FaEllipsisH,
  FaCode,
  FaDatabase,
  FaHtml5,
  FaPython,
  FaJs,
  FaBars,
  FaChevronLeft,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// CSS for glassmorphism effect
const styles = {
  glassEffect: {
    background: 'rgba(25, 33, 44, 0.65)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  glassHeader: {
    background: 'rgba(25, 33, 44, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1030
  },
  glassItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  glassItemHover: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.2)'
  },
  mainContent: {
    background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    color: 'white'
  }
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    following: true,
    popular: true
  });
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="d-flex flex-column vh-100" style={styles.mainContent}>
      {/* Header */}
      <header className="p-3 d-flex justify-content-between align-items-center" style={styles.glassHeader}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0 text-white">Scrimba</h4>
        </div>
        
        {/* Search box, notifications and user profile - shown in header when sidebar is collapsed */}
        <div className="d-flex align-items-center">
          <div className="me-4 text-white">
            <FaSearch />
          </div>
          <div className="me-4 text-white">
            <FaBell />
          </div>
          {collapsed && (
            <div className="bg-danger rounded-circle d-flex justify-content-center align-items-center" 
                 style={{ width: '36px', height: '36px' }}>
              <span className="text-white">A</span>
            </div>
          )}
        </div>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`text-white p-3 ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`} 
          style={{
            ...styles.glassEffect,
            width: collapsed ? '70px' : '250px',
            transition: 'width 0.3s ease-in-out',
            position: 'relative',
            height: 'calc(100vh - 62px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: collapsed ? '15px' : '3px' // Added extra padding when collapsed
          }}
        >
          {/* Collapse Toggle Button - Fixed Position */}
          <button 
            className="btn position-absolute" 
            style={{ 
              ...styles.glassEffect, 
              top: '10px', 
              right: collapsed ? '-15px' : '-15px', // Fixed position for both states
              zIndex: 1000,
              padding: '4px 8px',
              color: 'white'
            }}
            onClick={toggleSidebar}
          >
            {collapsed ? <FaBars /> : <FaChevronLeft />}
          </button>

          {/* User Profile - Only shown in sidebar when expanded */}
          {!collapsed && (
            <div className="d-flex align-items-center mb-4 mt-2">
              <div className="bg-danger rounded-circle d-flex justify-content-center align-items-center me-2" 
                   style={{ width: '36px', height: '36px', minWidth: '36px' }}>
                <span className="text-white">A</span>
              </div>
              <div className="text-truncate">ANANDHASIVAM V S</div>
            </div>
          )}

          {/* Main Navigation */}
          <ul className="nav flex-column mb-4">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaHome className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Home</span>}
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaBook className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Courses</span>}
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaTags className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Topics</span>}
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaProjectDiagram className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Projects</span>}
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaUsers className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Teams</span>}
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                 style={styles.glassItem}
                 onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                 onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                <FaEllipsisH className={collapsed ? '' : 'me-3'} />
                {!collapsed && <span>Extras</span>}
              </a>
            </li>
          </ul>

          {/* Following Section */}
          {!collapsed && (
            <div className="mb-2">
              <div 
                className="d-flex justify-content-between align-items-center text-muted text-uppercase small ms-2 mb-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSection('following')}
              >
                <span>Following</span>
                {expandedSections.following ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </div>
              
              {expandedSections.following && (
                <ul className="nav flex-column mb-4">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaCode className="me-3" />
                      <span>Frontend Path</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Popular Section */}
          {!collapsed && (
            <div>
              <div 
                className="d-flex justify-content-between align-items-center text-muted text-uppercase small ms-2 mb-2"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSection('popular')}
              >
                <span>Popular</span>
                {expandedSections.popular ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </div>
              
              {expandedSections.popular && (
                <ul className="nav flex-column mb-4">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <span className="me-3">AI</span>
                      <span>AI</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaCode className="me-3" />
                      <span>CSS</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaDatabase className="me-3" />
                      <span>Databases</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaHtml5 className="me-3" />
                      <span>HTML</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaCode className="me-3" />
                      <span>Imba</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaJs className="me-3" />
                      <span>JavaScript</span>
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-white d-flex align-items-center p-2"
                       style={styles.glassItem}
                       onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.glassItemHover)}
                       onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.glassItem)}>
                      <FaPython className="me-3" />
                      <span>Python</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Collapsed view icons for following and popular */}
          {collapsed && (
            <>
              <div className="text-center mb-3 mt-4 px-1">
                <FaCode size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <span style={{ fontSize: '12px' }}>AI</span>
              </div>
              <div className="text-center mb-3 px-1">
                <FaCode size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <FaDatabase size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <FaHtml5 size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <FaCode size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <FaJs size={20} />
              </div>
              <div className="text-center mb-3 px-1">
                <FaPython size={20} />
              </div>
            </>
          )}

          {/* Free Month Button */}
          {!collapsed ? (
            <button className="btn btn-warning w-100 mt-3" style={{ 
              background: 'linear-gradient(45deg, #f59e0b, #f97316)',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
              border: 'none',
              fontWeight: 'bold'
            }}>
              CLAIM FREE MONTH
            </button>
          ) : (
            <button className="btn mt-3 p-1 mx-auto d-block" style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(45deg, #f59e0b, #f97316)',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
              border: 'none'
            }}>
              <FaUsers size={16} color="white" />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ overflowY: 'auto' }}>
          <h1 className="text-white mb-3">Home</h1>
          <div className="mb-4">
            <p className="text-light">Welcome to Scrimba v2, a place to level up your coding skills and build awesome projects. 
              <a href="#" className="text-info ms-2">Watch this video</a> to get an overview of what's new.
            </p>
          </div>
          
          <div className="card mb-4" style={{
            ...styles.glassEffect,
            color: 'white',
            borderRadius: '12px'
          }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">How did you find us?</h5>
                <small className="text-light">Step 1 of 2</small>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-3 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>MDN</button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>FRIEND</button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>SCHOOL</button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>YOUTUBE</button>
                </div>
                <div className="col-md-4 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>SEARCH ENGINE</button>
                </div>
                <div className="col-md-4 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>SOCIAL MEDIA</button>
                </div>
                <div className="col-md-4 mb-2">
                  <button className="btn w-100" style={{
                    ...styles.glassItem,
                    color: 'white'
                  }}>OTHER</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <ul className="nav nav-tabs" style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <li className="nav-item">
                <a className="nav-link active" href="#" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none'
                }}>Recent <span className="badge bg-secondary">99+</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  border: 'none'
                }}>Discover <span className="badge bg-secondary">23</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  border: 'none'
                }}>Playgrounds</a>
              </li>
            </ul>
            
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button className="btn" style={{
                ...styles.glassItem,
                color: 'white'
              }}>
                <FaBars /> Filter 175 results...
              </button>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <div className="card h-100" style={{
                  ...styles.glassEffect,
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div className="card-body text-white">
                    <h5 className="card-title">Learn React Router 6</h5>
                    <p className="card-text text-light">Learn React Router v6, the most popular routing library for React applications and one of the most downloaded React support libraries ever.</p>
                  </div>
                  <div className="card-footer bg-transparent border-top" style={{
                    borderColor: 'rgba(255, 255, 255, 0.1) !important'
                  }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge" style={{
                        background: 'rgba(13, 202, 240, 0.2)',
                        color: '#0dcaf0',
                        backdropFilter: 'blur(10px)'
                      }}>React</span>
                      <small className="text-light">6 modules • 9.7 hrs</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;