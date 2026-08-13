import { Link } from 'react-router-dom';

export function AuthorPage() {
  return (
    <div className="author-page">
      <div className="author-page__portrait-wrap">
        <img
          className="author-page__portrait"
          src="./matias.jpeg"
          alt="Matias wearing colorful sunglasses on a sunny bridge"
        />
      </div>
      <span className="eyebrow">The creator</span>
      <h1>Meet Matias</h1>
      <p className="author-page__bio">
        Hi, I'm Matias, I'm 9 years old, I love soccer and I'm learning how to code.
      </p>
      <Link className="btn btn-primary" to="/">
        Back to Capitals Quest
      </Link>
    </div>
  );
}
