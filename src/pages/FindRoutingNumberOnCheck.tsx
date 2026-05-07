import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import CheckDiagram from '../components/CheckDiagram';
import AdUnit from '../components/AdUnit';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function FindRoutingNumberOnCheck() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`How to Find Your Routing Number on a Check (${currentYear} Guide)`}
        description="Learn exactly where to find your 9-digit bank routing number on a personal or business check with our visual guide and MICR explanation."
        canonicalUrl="/find-routing-number-on-check"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'Find Routing Number on Check', url: '/find-routing-number-on-check' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 mt-8">
        How to Find Your Routing Number on a Check
      </h1>
      <ArticleAuthorMeta date="February 10, 2026" readTime="2 min read" />
        
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-400">
              The fastest and most reliable way to find your bank's routing number is by looking at a physical check. Whether you are using a personal checkbook or a business check, the routing number is always printed in the same specific location.
            </p>

            <AdUnit slot="UNIT 1: Below H1" className="my-8" />

            <h2 id="check-diagram">Visual Guide: Finding the Numbers</h2>
            <CheckDiagram />

            <p className="mt-6">
              When you look at the bottom of your check, you will see a string of numbers printed in a special font called <strong>MICR</strong> (Magnetic Ink Character Recognition). This line consists of three distinct sets of numbers:
            </p>

            <ol>
              <li>
                <strong>The Routing Number:</strong> This is the 9-digit number located on the far left side. It is always surrounded by a special symbol that looks like a vertical line with a colon: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">|:</code>.
              </li>
              <li>
                <strong>The Account Number:</strong> This sequence usually sits right in the middle. It varies in length but is generally between 8 and 12 digits, representing your specific, personal banking account.
              </li>
              <li>
                <strong>The Check Number:</strong> Found on the far right, this short number matches the check sequence printed at the top right corner of the check itself.
              </li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 p-6 rounded-xl my-8">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mt-0 mb-3">Key Takeaway</h3>
              <p className="mb-0 text-blue-800 dark:text-blue-200">
                To find your routing number, always look at the <strong>bottom left corner</strong> of your check. The routing number is exactly <strong>9 digits long</strong>.
              </p>
            </div>

            <AdUnit slot="UNIT 2: Mid Content" className="my-10" />

            <h2 id="what-if-no-check">What If I Don't Have a Check?</h2>
            <p>
              If you don't have paper checks handy, you can also locate your routing number using these methods:
            </p>
            <ul>
              <li><strong>Online Banking:</strong> Log into your bank's portal and navigate to "Account Details" or "Direct Deposit Info."</li>
              <li><strong>Mobile App:</strong> Tap your account balance or the "Info" icon in your bank's mobile application.</li>
              <li><strong>Bank Statement:</strong> Most monthly bank statements will print the routing number at the top or bottom of the first page.</li>
              <li><strong>Search Directory:</strong> Use our <Link to="/">Routing Number lookup tool</Link> to find the correct number using your bank's name and state.</li>
            </ul>

            <h2 id="business-vs-personal">Business vs. Personal Checks</h2>
            <p>
              The basic layout remains the same for both personal and business checks. The routing number will still be a 9-digit code on the bottom left. However, some larger business checks may place the check number to the left of the routing number. In those rare cases, look for the set of numbers that is exactly 9 digits long and surrounded by the <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">|:</code> symbol.
            </p>

          </article>
        </div>
        
        <aside className="lg:w-1/3">
          <TableOfContents />
          <div className="sticky top-[450px]">
             <AdUnit slot="UNIT 4: Sidebar Ad, Display" className="min-h-[250px] mb-6" />
             <RecentlyViewedWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
