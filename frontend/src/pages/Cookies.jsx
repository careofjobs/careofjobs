import StaticPage from './StaticPage';

export default function Cookies() {
    return (
        <StaticPage title="Cookie Policy" lastUpdated="March 2026">
            <p>
                This Cookie Policy explains how <strong>C/O Jobs</strong> uses cookies and similar
                technologies to recognize you when you visit our website. It explains what these technologies
                are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What are cookies?</h2>
            <p>
                Cookies are small data files that are placed on your computer or mobile device when you
                visit a website. Cookies are widely used by website owners to make their websites work,
                or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Why do we use cookies?</h2>
            <p>We use first and third-party cookies for several reasons:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                <li>
                    <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you
                    with services available through our website, such as maintaining your login session.
                </li>
                <li>
                    <strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance
                    the performance and functionality of our website but are non-essential to their use.
                </li>
                <li>
                    <strong>Analytics and Customization Cookies:</strong> These cookies collect information
                    that is used either in aggregate form to help us understand how our website is being used,
                    or to help us customize our website for you.
                </li>
                <li>
                    <strong>Advertising Cookies:</strong> These cookies are used to make advertising messages
                    more relevant to you. They perform functions like preventing the same ad from continuously
                    reappearing.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How can I control cookies?</h2>
            <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your
                web browser controls to accept or refuse cookies. If you choose to reject cookies, you may
                still use our website though your access to some functionality and areas of our website may
                be restricted.
            </p>

        </StaticPage>
    );
}
