import { Board } from '@/types/userArticle';

interface TableProps {
  items: Board[];
}

const Table = ({ items }: TableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope='col'>번호</th>
            <th scope='col'>제목</th>
            <th scope='col'>작성자</th>
            <th scope='col'>좋아요</th>
            <th scope='col'>날짜</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.writer.name}</td>
              <td>{item.likeCount}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
