import { slideAnimationDuration } from '@mui/x-date-pickers/CalendarPicker/PickersSlideTransition';
import React, { PureComponent, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Content {
  trash_kind: string;
  cnt: number;
}

interface Contentlist {
  list: Array<Content>;
}

const trashlist: Contentlist =
{
  list: [
    {
      trash_kind: "GLASS",
      cnt: 0
    },
    {
      trash_kind: "BIODEGRADABLE",
      cnt: 0
    },
    {
      trash_kind: "CARDBOARD",
      cnt: 0
    },
    {
      trash_kind: "PAPER",
      cnt: 0
    },
    {
      trash_kind: "METAL",
      cnt: 0
    },
    {
      trash_kind: "PLASTIC",
      cnt: 0
    },
  ]
}

function TrashChart({ list }: Contentlist) {
  const [BasicList, setBasicList] = useState(trashlist.list);
  /*
    React.useEffect(() => {
      console.log("list",list);
      console.log("기본 데이터",trashlist.list);
      for (let i = 0; i < trashlist.list.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].trash_kind === trashlist.list[i].trash_kind) {
            trashlist.list[i].cnt = list[j].cnt;
            console.log("같은 것을 발견");
          }
        }
      }
      setBasicList(trashlist.list);
      console.log("데이터 변환",trashlist.list);
    }
      , [list]);
*/
  React.useEffect(() => {
    console.log("list", list);
    if (list) {
      if (list.length === 0) { // 받아오는 데이터가 존재하지 않을 때
        const needList: Content[] = trashlist.list?.map((blanklist: any) => {
          blanklist.cnt = 0;
          return blanklist;
        })
        setBasicList(needList);
        console.log("찾는 데이터가 없음");
      }
      else { // 그 외 데이터가 존재할 때
        const tempList: Content[] = trashlist.list?.map((trashlist: any) => {
          list?.map((getlist: any) => {
            if (getlist?.trash_kind === trashlist?.trash_kind) {
              trashlist.cnt = getlist.cnt;
              console.log("같은 것을 발견");
            }
            return getlist;
          }
          )
          return trashlist;
        });
        setBasicList(tempList); // trashlist.list로 바로 쓰면 적합하지않음. 새로 배열을 만들어 넣기!
        console.log("데이터 변환", trashlist.list);
      }
    }
  }, [list]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={300}
        data={BasicList}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='trash_kind' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='cnt' fill="#759F98" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TrashChart;