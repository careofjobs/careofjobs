import StaticPage from './StaticPage';

export default function PrivacyPolicy() {
    return (
        <StaticPage title="Privacy Policy" lastUpdated="March 2026">
            <p>
                At <strong>C/O Jobs</strong>, we take your privacy seriously. This Privacy Policy outlines
                how we collect, use, and protect your personal information when you use our platform to
                find jobs or recruit talent.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>
                When you create an account, apply for jobs, or browse our listings, we collect information such as:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                <li>Your name, email address, and professional profile (e.g., resume, portfolio links).</li>
                <li>Usage data including pages visited, job clicks, and search queries.</li>
                <li>Device information and IP address for security and analytics purposes.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
                We use the collected information to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                <li>Provide and improve our job-matching services.</li>
                <li>Communicate with you regarding job applications, platform updates, and relevant opportunities.</li>
                <li>Ensure the security and integrity of our platform.</li>
                <li>Analyze user behavior to enhance the overall user experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Sharing Your Information</h2>
            <p>
                We only share your information with potential employers when you explicitly apply for a job or
                make your profile public. We do not sell your personal data to third-party data brokers.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Security</h2>
            <p>
                We implement industry-standard security measures to protect your data from unauthorized access,
                alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and
                we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or how we handle your data,
                please contact us at <strong>privacy@C/O Jobs.com</strong>.
            </p>
        </StaticPage>
    );
}
