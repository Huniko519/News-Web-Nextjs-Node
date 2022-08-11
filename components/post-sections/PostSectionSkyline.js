import React from 'react';

function Skyline(...data) {
  if (data.length === 0 || data[0].items.length === 0) {
    return null;
  }

  const skylines = data[0].items;

  // Vary which window the link opens in depending on internal vs external href
  skylines.forEach((skyline, idx) => {
    skylines[idx].target = '_blank';
    if (skyline.link.includes('https://inews')) {
      skylines[idx].target = '_self';
    }
  });

  return (
    <section className="inews__post-section skyline" aria-label="Gallery" data-type="Skylines">
      <div className="skyline__cards">
        {skylines.map((skyline, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <a className="skyline__slide" key={i} href={skyline?.link} target={skyline?.target} style={{ backgroundImage: `url(${skyline?.background_image})` }}>
            <h3 style={{ color: `${skyline?.headline_color}` }}>{skyline?.title?.rendered}</h3>
            <p dangerouslySetInnerHTML={{ __html: skyline?.content?.rendered }} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default Skyline;
