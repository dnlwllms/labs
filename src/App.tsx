import { FC, useEffect, useRef } from "react";
import Form, { useForm } from "./packages/form";
import { NumberUtility, StringUtility, DateUtility } from "./packages/util";
import Table, { TableColumn } from "./packages/table";
import Dialog from "./packages/dialog";

const { getRandomNumber } = NumberUtility;
const { getRandomWord, getStringParagragh } = StringUtility;
const { getRandomDate } = DateUtility;

type TestData = {
  id: number;
  name: string;
  age: number;
  gender: string;
  nickname: string;
  memo: string;
  createdAt: string;
};

function App() {
  const columns: TableColumn[] = [
    {
      key: "personalInfo",
      title: "개인정보",
      children: [
        {
          key: "id",
          title: "아이디",
        },
        {
          key: "name",
          title: "이름",
        },
        {
          key: "age",
          title: "연령",
        },
        {
          key: "gender",
          title: "성별",
        },
      ],
    },
    {
      key: "personalInfo2",
      title: "부가정보",
      children: [
        {
          key: "nickname",
          title: "닉네임",
        },
        {
          key: "memo",
          title: "메모",
        },
        {
          key: "createdAt",
          title: "생성일",
        },
      ],
    },
  ];

  const data: TestData[] = Array.from({ length: 100 }).map((_, index) => {
    return {
      id: index,
      name: getRandomWord(getStringParagragh("names")),
      age: getRandomNumber(15, 50),
      gender: getRandomNumber() % 2 === 0 ? "male" : "female",
      nickname: getRandomWord(getStringParagragh("names")),
      memo: getRandomWord(),
      createdAt: getRandomDate().toISOString(),
    };
  });

  const handleSort = (columnKey: string) => {};

  return (
    <div>
      <Table columns={columns} data={data}>
        {({ clientData, entryColumns, setClientData }) => {
          return (
            <>
              <Table.Head>
                {entryColumns.map((row, rowIndex) => {
                  const isLast = rowIndex === entryColumns.length - 1;
                  return (
                    <tr key={row[rowIndex].key}>
                      {row.map((column) => {
                        return (
                          <th
                            key={column.key}
                            colSpan={column.colSpan}
                            onClick={
                              isLast ? () => handleSort(column.key) : undefined
                            }
                          >
                            {column.title}
                            {isLast && (
                              <Dialog>
                                <Dialog.Trigger>
                                  <button>filter</button>
                                </Dialog.Trigger>
                                <Dialog.Body>
                                  {({ handleClose, triggerRect }) => {
                                    return (
                                      <Dialog.Body.Popup
                                        triggerRect={triggerRect}
                                        positionOption={{
                                          topMargin: triggerRect?.height,
                                        }}
                                        handleClose={handleClose}
                                      >
                                        <div
                                          style={{
                                            whiteSpace: "nowrap",
                                            background: "white",
                                            padding: 20,
                                            borderRadius: 10,
                                            border: "1px solid gray",
                                          }}
                                        >
                                          <FilterForm
                                            columnKey={column.key}
                                            data={clientData}
                                            onSubmit={(
                                              filteredData: Array<any>,
                                              filterValue: { keyword: string }
                                            ) => {
                                              if (filteredData.length === 0) {
                                                alert("데이터가 없습니다.");
                                              } else {
                                                setClientData(filteredData);
                                              }
                                              handleClose();
                                            }}
                                          />
                                        </div>
                                      </Dialog.Body.Popup>
                                    );
                                  }}
                                </Dialog.Body>
                              </Dialog>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </Table.Head>
              <Table.Body />
            </>
          );
        }}
      </Table>
    </div>
  );
}

export default App;

interface FilterFormProps {
  columnKey: string;
  data: any[];
  onSubmit: (filteredData: any[], values: any) => void;
}

const FilterForm: FC<FilterFormProps> = ({ columnKey, data, onSubmit }) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  const filterForm = useForm({
    initialValues: {
      keyword: "",
    },
  });

  return (
    <Form
      form={filterForm}
      onSubmit={(values) => {
        if (values.keyword) {
          const filteredData = data.filter((item) => {
            const typedKey = columnKey as keyof TestData;
            return String(item[typedKey])
              .toLowerCase()
              .includes(values.keyword.toLowerCase());
          });
          onSubmit(filteredData, values);
        }
      }}
    >
      <Form.Item fieldKey="keyword">
        <Form.Item.Input ref={firstInputRef} />
      </Form.Item>
      <button>submit</button>
    </Form>
  );
};
