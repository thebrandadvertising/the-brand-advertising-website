const brands = [
  { name: "Hero", domain: "heromotocorp.com" },
  { name: "IndianOil", domain: "iocl.com" },
  { name: "Wagh Bakri", domain: "waghbakritea.com" },
  { name: "Campus", domain: "campusshoes.com" },
  { name: "TVS", domain: "tvsmotor.com" },
  { name: "TVS Radeon", domain: "tvsmotor.com" },
  { name: "JK Cement", domain: "jkcement.com" },
  { name: "Tata Sampann", domain: "tatasampann.com" },
  { name: "Kamdhenu Steel", domain: "kamdhenulimited.com" },
];

export default function BrandOrbit() {
  return (
    <section className="trusted-brands" aria-labelledby="trusted-brands-title">
      <div className="trusted-brands-heading">
        <span>Trusted by</span>
        <h2 id="trusted-brands-title">Leading Brands</h2>
      </div>
      <div className="trusted-brands-window">
        <div className="trusted-brands-track">
          {[...Array(2)].map((_, group) => (
            <div className="trusted-brands-group" key={group} aria-hidden={group === 1}>
              {brands.map((brand) => (
                <div className="trusted-brand-card" key={`${group}-${brand.name}`}>
                  <img src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=256`} alt={group === 0 ? `${brand.name} logo` : ""} width="256" height="256" loading="lazy" decoding="async" />
                  <strong>{brand.name}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
