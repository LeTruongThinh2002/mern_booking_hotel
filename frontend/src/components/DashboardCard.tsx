import {Link} from 'react-router-dom';

type Props = {
  icon: any;
  title: string;
  body: any;
};

const DashboardCard = ({icon, title, body}: Props) => {
  return (
    <Link
      to={`/dashboard`}
      className={`flex flex-col cursor-pointer shadow-md shadow-black hover:shadow-lg hover:shadow-orange-400 items-center rounded-md bg-sky-950 hover:bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] hover:bg-no-repeat hover:bg-center hover:bg-cover group`}
    >
      <div className='flex lg:flex-row flex-col justify-center items-center place-content-center m-5 p-3 gap-5'>
        <div className='flex items-center'>{icon}</div>
        <div className='grid grid-rows-2 items-center'>
          <h3 className='bg-clip-text font-bold text-xl group-hover:text-sky-950'>
            {title}
          </h3>
          <span className='text-slate-200 font-semibold text-lg group-hover:text-sky-950'>
            {body}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
