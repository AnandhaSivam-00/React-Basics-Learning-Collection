import React from 'react'
import { Modal } from 'antd';

const AgreementModal = ({ open, setOpen, setUserAgree }) => {
    return (
        <Modal
            title="User Agreement & Privacy Policy"
            centered
            open={open}
            onOk={() => {
                setOpen(false);
                if (setUserAgree) setUserAgree(true);
            }}
            onCancel={() => setOpen(false)}
            okText="I Agree"
            cancelText="Close"
            width={600}
        >
            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                <p className="text-secondary mb-3">
                    Please read this User Agreement carefully before continuing to use the <strong>Tenzies Game</strong> application.
                </p>

                <h6 className="fw-bold mt-3">1. Acceptance of Terms</h6>
                <p>
                    By checking the agreement box and registering an account, you explicitly agree to comply with and be bound by the terms outlined in this agreement. You must accept these terms to continue using this application and its features.
                </p>

                <h6 className="fw-bold mt-3">2. Account Registration & Data Collection</h6>
                <p>
                    To sign up and create a user profile, you may be required to enter your personal data, including but not limited to:
                </p>
                <ul className="mb-2">
                    <li>Full Name and Email Address</li>
                    <li>Gender and Phone Number</li>
                    <li>Optional profile information ("About Me")</li>
                    <li>Game activity logs and leaderboard statistics</li>
                </ul>

                <h6 className="fw-bold mt-3">3. Data Storage & Security</h6>
                <p>
                    All user-related data, account credentials, game history, and settings entered during sign up are stored securely in the <strong>Google Firebase Database</strong> (Firebase Authentication and Cloud Firestore).
                </p>

                <h6 className="fw-bold mt-3">4. User Data Deletion Request</h6>
                <p>
                    You have the right to request the complete removal of your account and user-related data from our database at any time.
                </p>
                <div className="p-3 bg-light rounded border mb-2">
                    <p className="mb-1 text-dark">
                        To submit a data deletion request, please send an email with your registered email address to:
                    </p>
                    <a href="mailto:support@tenziesgame.com" className="fw-bold text-primary">
                        hidden.duty779@passinbox.com
                    </a>
                </div>
                <p className="text-muted small">
                    Upon verification of your request, all corresponding user data stored in the Firebase DB will be permanently purged.
                </p>
            </div>
        </Modal>
    )
}

export default AgreementModal