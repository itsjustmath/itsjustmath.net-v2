module.exports = {
  async redirects() {
    return [
      // Specific redirects
      {
        source: "/blog",
        destination: "/essays",
        permanent: true,
      },
      {
        source: "/how-are-you-so-organized",
        destination: "/how-organized",
        permanent: true,
      },
      {
        source: "/the-right-amount-of-stress-is-called-stimulation",
        destination: "/stress-stimulation",
        permanent: true,
      },

      // Path matching
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/page/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};
