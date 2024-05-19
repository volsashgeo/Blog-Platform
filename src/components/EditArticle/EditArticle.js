import { useSelector } from 'react-redux';

import { appSelectors } from '../../store';
import CreateArticle from '../CreateArticle';

export default function EditArticle() {
  const pageName = 'Edit article';
  const  article  = useSelector(appSelectors.article);

  return <CreateArticle pageName={pageName} {...article} />;
}
