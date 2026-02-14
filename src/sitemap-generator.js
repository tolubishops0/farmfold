const { createWriteStream } = require("fs");
const { SitemapStream } = require("sitemap");
const sitemap = new SitemapStream({ hostname: "https://ajeoba.com" });

const writeStream = createWriteStream("./public/sitemap.xml");
sitemap.pipe(writeStream);

sitemap.write({ url: "/", changefreq: "daily", priority: 1 });
sitemap.write({ url: "/about-us", changefreq: "weekly", priority: 1 });
sitemap.write({ url: "/faqs", changefreq: "weekly", priority: 1 });
sitemap.write({ url: "/blog", changefreq: "weekly", priority: 1 });
sitemap.write({ url: "/about-us", changefreq: "weekly", priority: 1 });
sitemap.write({ url: "/signin", changefreq: "weekly", priority: 1 });
sitemap.write({
  url: "/our-value-proposition",
  changefreq: "weekly",
  priority: 1,
});

const farminput = "INPUT_LIST";
const farmproduce = "PRODUCT_LIST";
const productTypes = [farminput, farmproduce];
const categoryFilters = ["INPUT", "DRY", "LIVESTOCK", "REFRIGERATED"];

productTypes.forEach((productType) => {
  categoryFilters.forEach((categoryFilter) => {
    const url = `/view-marketplace/${productType}/${categoryFilter}`;
    sitemap.write({
      url: url,
      changefreq: "daily",
      priority: 1,
    });
  });
});
sitemap.end();
