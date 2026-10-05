import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const regions = [
  ["North India", "Delhi NCR, Chandigarh, Jaipur, Lucknow, Kanpur, Dehradun, Jammu, Amritsar, Ludhiana and other markets across Delhi, Haryana, Punjab, Rajasthan, Uttar Pradesh, Uttarakhand, Himachal Pradesh and Jammu & Kashmir."],
  ["West & Central India", "Mumbai, Pune, Ahmedabad, Surat, Vadodara, Indore, Bhopal, Nagpur, Raipur and other markets across Maharashtra, Gujarat, Goa, Madhya Pradesh and Chhattisgarh."],
  ["South India", "Bengaluru, Hyderabad, Chennai, Kochi, Coimbatore, Mysuru, Vijayawada, Visakhapatnam and other markets across Karnataka, Telangana, Andhra Pradesh, Tamil Nadu and Kerala."],
  ["East & Northeast India", "Kolkata, Patna, Bhubaneswar, Ranchi, Guwahati and other markets across West Bengal, Bihar, Odisha, Jharkhand, Assam and the Northeast."],
];

export default function Coverage() {
  const description = "The Brand Advertising executes auto hood branding, cab branding, retail branding and outdoor campaigns across major cities and regional markets in India.";
  return (
    <main id="main-content">
      <Seo title="Pan-India Advertising Campaign Coverage | The Brand Advertising" description={description} path="/pan-india-coverage" pageType="CollectionPage" />
      <section className="pt-40 pb-20 bg-ink text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.24em] uppercase text-[#f1c94c] mb-5">Pan-India campaign execution</p>
          <h1 className="font-display font-semibold text-4xl md:text-6xl mb-6">Advertising that moves across India</h1>
          <p className="text-white/70 text-lg leading-relaxed">We coordinate vehicle branding, retail visibility and on-ground campaigns across metros, state capitals and regional markets.</p>
        </div>
      </section>
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {regions.map(([title, text]) => (
            <article key={title} className="p-8 rounded-2xl bg-white shadow-card">
              <h2 className="font-display font-semibold text-2xl mb-4">{title}</h2>
              <p className="text-charcoal-soft/80 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="py-20 bg-mist text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl mb-5">Tell us the markets you want to reach</h2>
          <p className="text-charcoal-soft/80 mb-8">Coverage depends on the service, campaign scale and local availability. Share your target cities for a tailored execution plan.</p>
          <Link to="/contact?quote=1" className="inline-flex px-7 py-4 rounded-full bg-brand-red text-white font-medium">Plan a Pan-India Campaign</Link>
        </div>
      </section>
    </main>
  );
}
