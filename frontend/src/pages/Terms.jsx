import StaticPage from './StaticPage';

export default function Terms() {
    return (
        <StaticPage title="Terms of Service" lastUpdated="March 2026">
            <p>
                Welcome to <strong>C/O Jobs</strong>. By accessing or using our website, services,
                or applications, you agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use our platform.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Use of the Platform</h2>
            <p>
                C/O Jobs provides a platform connecting job seekers with employers. You must be at least
                18 years old to use our services. You agree to provide accurate, current, and complete
                information when creating an account or applying for jobs.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. User Accounts</h2>
            <p>
                You are responsible for maintaining the confidentiality of your account credentials and
                for all activities that occur under your account. You must notify us immediately of any
                unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Acceptable Use Policy</h2>
            <p>When using C/O Jobs, you agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                <li>Post false, inaccurate, or misleading information.</li>
                <li>Post jobs that require applicants to pay a fee.</li>
                <li>Use the platform for any illegal or unauthorized purpose.</li>
                <li>Scrape, crawl, or otherwise attempt to extract data systematically from our platform.</li>
                <li>Transmit any malware, viruses, or destructive code.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p>
                All content on C/O Jobs, including text, graphics, logos, and software, is the property
                of C/O Jobs or its licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
                C/O Jobs acts solely as a platform to connect users. We do not guarantee the validity of any
                job listing or the employment outcomes. We shall not be liable for any indirect, incidental,
                or consequential damages arising from your use of the platform.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Changes to Terms</h2>
            <p>
                We reserve the right to modify these terms at any time. We will notify users of significant
                changes by updating the "Last Updated" date at the top of this page. Your continued use
                of the platform constitutes acceptance of the modified Terms.
            </p>
        </StaticPage>
    );
}
