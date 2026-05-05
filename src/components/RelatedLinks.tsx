import { Link } from 'react-router-dom';

export default function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: { name: string; url: string }[];
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              to={link.url}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
