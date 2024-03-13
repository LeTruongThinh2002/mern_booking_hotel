import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {MonthlyChart} from '../../../backend/src/shared/types';

type Props = {
  chartData: MonthlyChart;
  year: number | null;
};

const ChartData = ({chartData, year}: Props) => {
  if (!chartData) {
    return <></>;
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
  );
  // Xử lý dữ liệu cho biểu đồ
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // Giả sử mảng tháng này có sẵn
  const labels = months.map(month => month);
  const dataValues = monthArray.map(
    month => chartData.monthlyTotals[month] || 0
  ); // Lấy tổng theo tháng
  const ortherDataValues = monthArray.map(
    month => chartData.ortherTotals[month] || 0
  ); // Lấy tổng theo tháng
  const data = {
    labels,
    datasets: [
      {
        label: 'Total profit by month', // Nhãn cho dataset
        data: dataValues, // Dữ liệu tổng theo tháng
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Màu nền của đường
        borderColor: 'rgba(54, 162, 235, 1)' // Màu của đường viền
      },
      {
        label: 'Total spending by month', // Nhãn cho dataset
        data: ortherDataValues, // Dữ liệu tổng theo tháng
        backgroundColor: 'rgba(255,0,0,0.5)', // Màu nền của đường
        borderColor: 'rgba(255,0,0,1)' // Màu của đường viền
      }
    ]
  };

  ChartJS.defaults.color = 'rgb(226,232,240)';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Profit chart in ' + (year || new Date().getFullYear()),
        font: {
          size: 24
        }
      }
    }
  };
  return (
    <div className='flex items-center'>
      <Line data={data} options={options} width={500} height={500} />
    </div>
  );
};

export default ChartData;
