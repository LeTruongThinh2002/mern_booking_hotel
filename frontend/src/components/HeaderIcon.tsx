import {Link} from 'react-router-dom';

type Props = {
  icon: any;
  title: string;
  to: string;
};

const HeaderIcon = ({icon, title, to}: Props) => {
  return (
    <Link title={title} className='flex items-center text-3xl ' to={to}>
      {icon}
    </Link>
  );
};

export default HeaderIcon;
