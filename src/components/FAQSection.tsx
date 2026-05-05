export default function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">{faq.question}</h3>
            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
