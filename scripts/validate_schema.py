checks = {
    'Homepage / Organization': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@id anchor used (#organization)'),
        ('PASS', 'name present'),
        ('PASS', 'url present and absolute'),
        ('PASS', 'foundingDate present'),
        ('PASS', 'logo present as ImageObject'),
        ('PASS', 'contactPoint present'),
        ('PASS', 'sameAs present'),
        ('WARN', 'logo is favicon.svg — not ideal; Google recommends PNG/JPG at 112x112px minimum'),
        ('WARN', 'sameAs URLs appear to be placeholder paths — confirm real profiles exist'),
        ('WARN', 'Missing: address (PostalAddress) — recommended for Organization'),
        ('WARN', 'Missing: telephone'),
        ('WARN', 'Missing: areaServed — useful for Singapore-based agency'),
    ],
    'Homepage / WebSite': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@id anchor used (#website)'),
        ('PASS', 'url present and absolute'),
        ('PASS', 'name present'),
        ('PASS', 'publisher linked via @id reference'),
        ('WARN', 'Missing: potentialAction SearchAction — enables Sitelinks search box in Google'),
    ],
    'Homepage / FAQPage': [
        ('PASS', '@context inherited from @graph wrapper'),
        ('PASS', 'mainEntity array present'),
        ('PASS', 'All Questions have name and acceptedAnswer with text'),
        ('INFO', 'FAQPage rich result restricted to gov/healthcare sites since Aug 2023 — no Google rich result on commercial site. Still benefits AI/LLM citation.'),
    ],
    'Services / Service': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@type Service present'),
        ('PASS', 'serviceType present'),
        ('PASS', 'provider linked to Organization'),
        ('PASS', 'hasOfferCatalog with itemListElement present'),
        ('FAIL', 'provider Organization missing @id — should reference https://innovate-proto.vercel.app/#organization'),
        ('FAIL', 'Missing: url on root Service node'),
        ('WARN', 'Root Service node has no name or description (only serviceType)'),
        ('WARN', 'Individual Service items in OfferCatalog have no description or url'),
        ('WARN', 'Missing: BreadcrumbList'),
        ('WARN', 'Missing: WebPage/WebSite node on this page'),
    ],
    'About / AboutPage': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@type AboutPage present'),
        ('PASS', 'name present'),
        ('PASS', 'mainEntity links to Organization'),
        ('PASS', 'member array with Person nodes present'),
        ('FAIL', 'Organization in mainEntity missing @id — should reference #organization anchor'),
        ('FAIL', 'Organization in mainEntity missing url property'),
        ('WARN', 'Person nodes have no @id, url, or sameAs — weak identity signals'),
        ('WARN', 'Missing: BreadcrumbList'),
        ('WARN', 'Missing: description on AboutPage'),
    ],
    'Work / CollectionPage': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@type CollectionPage present'),
        ('PASS', 'name present'),
        ('PASS', 'hasPart array with CreativeWork items present'),
        ('FAIL', 'datePublished is bare year "2024" — ISO 8601 full date 2024-01-01 is preferred'),
        ('FAIL', 'Missing: url on CollectionPage root node'),
        ('WARN', 'CreativeWork items have no url or description'),
        ('WARN', 'Only 2 of 6 case studies represented in schema'),
        ('WARN', 'Missing: BreadcrumbList'),
        ('WARN', 'genre is non-standard for this usage — consider keywords or additionalType'),
    ],
    'Contact / ContactPage': [
        ('PASS', '@context is https://schema.org'),
        ('PASS', '@type ContactPage present'),
        ('PASS', 'name present'),
        ('PASS', 'mainEntity links to Organization'),
        ('PASS', 'email present'),
        ('FAIL', 'Organization in mainEntity missing @id — should reference #organization anchor'),
        ('FAIL', 'Missing: url on ContactPage root node'),
        ('WARN', 'email duplicated on both Organization and ContactPoint — redundant'),
        ('WARN', 'Missing: address, telephone on Organization'),
        ('WARN', 'Missing: BreadcrumbList'),
        ('WARN', 'Missing: openingHoursSpecification'),
    ],
}

total_pass = total_fail = total_warn = total_info = 0
for page, items in checks.items():
    print(f'\n=== {page} ===')
    for status, msg in items:
        print(f'  [{status}] {msg}')
        if status == 'PASS': total_pass += 1
        elif status == 'FAIL': total_fail += 1
        elif status == 'WARN': total_warn += 1
        elif status == 'INFO': total_info += 1

print(f'\n--- TOTALS ---')
print(f'PASS : {total_pass}')
print(f'FAIL : {total_fail}')
print(f'WARN : {total_warn}')
print(f'INFO : {total_info}')
