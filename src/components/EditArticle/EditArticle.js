import { useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';


import { appSelectors } from '../../store';
import CreateArticle from '../CreateArticle';

export default function EditArticle() {
  const { slug } = useParams();

  const pageName = 'Edit article';

  const articles = useSelector(appSelectors.articles);
  const article = articles.filter((item) => item.slug === slug)[0] ?? articles[-1];

  return <CreateArticle pageName={pageName} {...article} />;
}
