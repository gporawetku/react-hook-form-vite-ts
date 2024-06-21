import { useFieldArray, useForm } from "react-hook-form";

const thaiMonths = [
  { name: "January", title: "มกราคม" },
  { name: "February", title: "กุมภาพันธ์" },
  { name: "March", title: "มีนาคม" },
  { name: "April", title: "เมษายน" },
  { name: "May", title: "พฤษภาคม" },
  { name: "June", title: "มิถุนายน" },
  { name: "July", title: "กรกฎาคม" },
  { name: "August", title: "สิงหาคม" },
  { name: "September", title: "กันยายน" },
  { name: "October", title: "ตุลาคม" },
  { name: "November", title: "พฤศจิกายน" },
  { name: "December", title: "ธันวาคม" },
];

const SaleTargetForm = ({ initialData, defaultValues }: { initialData?: any; defaultValues?: any }) => {
  const form = useForm({
    defaultValues: initialData ? initialData : defaultValues,
  });
  const { control, handleSubmit, watch, register } = form;

  const months = useFieldArray({
    control,
    name: "months",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const month = watch("month");

  const tagets = {
    append: (object?: any, index?: any) => {
      const targets = watch(`months.${index}.targets`);
      targets.push({
        customerId: null,
        managerId: null,
        total: null,
      });
      months.update(index, { ...object, targets });
    },
    remove: (object?: any, index?: any, subIndex?: any) => {
      const targets = object.targets;
      targets.splice(subIndex, 1);
      months.update(index, { ...object, targets });
    },
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <select {...register(`month`)}>
              {thaiMonths.map((month: any, idx: any) => (
                <option key={idx} value={month.name}>
                  {month.name}
                </option>
              ))}
            </select>
            <select {...register(`employeeId`)}>
              <option value={1}>employee 1</option>
              <option value={2}>employee 2</option>
              <option value={3}>employee 3</option>
            </select>
          </div>
          {months.fields.map((field: any, idx: number) => (
            <div key={field.id}>
              {field.name === month && (
                <div className="">
                  {field.name}
                  <button type="button" onClick={() => tagets.append(field, idx)}>
                    append
                  </button>
                  {field.targets.map((target: any, tidx: number) => (
                    <div key={tidx}>
                      <select {...register(`months.${idx}.targets.${tidx}.customerId`)}>
                        <option value={1}>customer 1</option>
                        <option value={2}>customer 2</option>
                        <option value={3}>customer 3</option>
                      </select>
                      <select {...register(`months.${idx}.targets.${tidx}.managerId`)}>
                        <option value={1}>manager 1</option>
                        <option value={2}>manager 2</option>
                        <option value={3}>manager 3</option>
                      </select>
                      <input type="number" {...register(`months.${idx}.targets.${tidx}.total`)} />
                      <button type="button" onClick={() => tagets.remove(field, idx, tidx)} disabled={field.targets.length === 1}>
                        remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

const SaleTarget = () => {
  const defaultValues = () => {
    const months = thaiMonths.map((month: any, idx: any) => {
      return {
        name: month.name,
        targets: [
          {
            customerId: null,
            managerId: null,
            total: null,
          },
        ],
      };
    });

    return {
      month: "January",
      employeeId: null,
      months,
    };
  };

  return (
    <>
      <SaleTargetForm defaultValues={defaultValues()} />
    </>
  );
};

export default SaleTarget;
