import { User } from '../user/user.model';
import { Bonsai } from '../bonsai/bonsai.model';
import { Chapter } from '../chapter/chapter.model';
import { Article } from '../article/article.model';

export const setAssociations = () => {
  Bonsai.belongsTo(User, { foreignKey: 'userID' });
  User.hasOne(Bonsai, { foreignKey: 'userID' });

  Article.belongsTo(Chapter, { foreignKey: 'chapterID' });
  Chapter.hasMany(Article, { foreignKey: 'chapterID' });
};
