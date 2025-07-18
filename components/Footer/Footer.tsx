
import css from './Footer.module.css';

const Footer = () => {
    return <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Kostiantyn Chesak</p>
      <p>
        Contact us:
        <a href="mailto:K03.chesak@gmail.com">K03.chesak@gmail.com</a>
      </p>
    </div>
  </div>
</footer>
}


export default Footer;