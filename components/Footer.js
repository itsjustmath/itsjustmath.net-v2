export default function Footer(props) {
  return (
    <footer>
      <div className="credits">
        <span>
          &copy; 2022 <a href="/">Justin Mather</a>
        </span>

        <form
          action="https://buttondown.email/api/emails/embed-subscribe/itsjustmath"
          method="post"
          target="popupwindow"
          onSubmit="window.open('https://buttondown.email/itsjustmath', 'popupwindow')"
          className="embeddable-buttondown-form"
          style={{
            display: "inline-block",
            marginLeft: "10px",
          }}
        >
          <label htmlFor="bd-email">
            <strong>Newsletter Sign-up: </strong>
          </label>
          <input type="email" name="email" id="bd-email" placeholder="Email" />
          <input type="hidden" value="1" name="embed" />
          <input
            type="submit"
            value="Subscribe"
            style={{ marginLeft: "3px" }}
          />
        </form>
      </div>
    </footer>
  );
}