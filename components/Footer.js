export default function Footer(props) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="credits">
        <span>
          &copy; {year}{" "}
          <a
            href="https://github.com/itsjustmath/itsjustmath.net-v2"
            target="_blank"
            title="View the source code for this site on GitHub"
          >
            Justin Mather
          </a>
        </span>

        <form
          action="https://buttondown.email/api/emails/embed-subscribe/itsjustmath"
          method="post"
          target="popupwindow"
          onSubmit={() => {
            window.open("https://buttondown.email/itsjustmath", "popupwindow");
          }}
          className="embeddable-buttondown-form"
        >
          {/* <label htmlFor="bd-email">
            <strong>Newsletter Sign-up: </strong>
          </label> */}
          <div className="flex">
            <input
              type="email"
              name="email"
              id="bd-email"
              placeholder="Sign up for my newsletter"
              className="form-input sm"
              style={{ minWidth: 170 }}
            />
            <input type="hidden" value="1" name="embed" />
            <input
              type="submit"
              value="Subscribe"
              className="btn sm"
              style={{ marginLeft: "3px" }}
            />
          </div>
        </form>
      </div>
    </footer>
  );
}