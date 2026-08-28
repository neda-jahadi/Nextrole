import { Link } from 'react-router';
import Container from './Container';
import nextrole from '@/assets/images/nextrole-noB.png';

const Footer = () => {
  const footerLinkStyles =
    'text-primary-foreground/80 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-md';

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link className="flex items-center mr-4" to="/">
            <img className="h-12 w-auto" src={nextrole} alt="Sky Flow" />
          </Link>
          <nav aria-label="Job seeker links" className="flex flex-col gap-4">
            <h2 className="card-title">Job Seekers</h2>
            <ul>
              <li>
                <Link to="/jobs" className={footerLinkStyles}>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className={footerLinkStyles}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Employers links" className="flex flex-col gap-4">
            <h2 className="card-title">Employers</h2>
            <ul>
              <li>
                <Link to="/register-company" className={footerLinkStyles}>
                  Create business account
                </Link>
              </li>
              <li>
                <Link to="/jobs/add-job" className={footerLinkStyles}>
                  Post a Job
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/15 pt-6 flex justify-between">
          <p className="text-sm text-primary-foreground/70">© 2026 NextRole</p>
          <p className="text-sm text-primary-foreground/70">GitHub</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
