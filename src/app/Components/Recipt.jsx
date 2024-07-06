import React from "react";
import { useForm, Controller } from "react-hook-form";

function Reciept({ OnclickHandler }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      Tenantname: "",
      roomNo: "",
      OldMeterReading: 0,
      NewMeterReading: 0,
      UnitUsed: 0,
      BillAmount: 0,
      PreviousBalance: 0,
      TotalAmount: 0,
      Rent: 0,
    },
  });

  const watchNewMeterReading = watch("NewMeterReading");
  const watchOldMeterReading = watch("OldMeterReading");
  const watchBillAmount = watch("BillAmount");
  const watchPreviousBalance = watch("PreviousBalance");
  const watchRent = watch("Rent");

  const calculateUnitUsed = () => {
    const oldReading = parseFloat(watchOldMeterReading);
    const newReading = parseFloat(watchNewMeterReading);
    return newReading - oldReading;
  };

  const calculateTotalAmount = () => {
    const billAmount = parseFloat(watchBillAmount);
    const previousBalance = parseFloat(watchPreviousBalance);
    const rent = parseFloat(watchRent);
    return billAmount + previousBalance + rent;
  };

  const onSubmit = (data) => {
    const unitUsed = calculateUnitUsed();
    const totalAmount = calculateTotalAmount();

    const updatedData = {
      ...data,
      UnitUsed: unitUsed,
      TotalAmount: totalAmount,
    };

    console.log(updatedData);
    OnclickHandler(updatedData);
  };

  const CssStyling = {
    textInput: `border font-700 w-full rounded-xl p-2 font-semibold my-2`,
    label: "text-secondary-400 text-sm",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <label htmlFor="Tenantname" className={CssStyling.label}>
            Tenant Name *
          </label>
          <Controller
            name="Tenantname"
            control={control}
            rules={{ required: "Tenant name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="Tenantname"
                placeholder="Enter tenant name"
                className={`${CssStyling.textInput} ${
                  errors.Tenantname ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.Tenantname && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.Tenantname.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="roomNo" className={CssStyling.label}>
            Room Number *
          </label>
          <Controller
            name="roomNo"
            control={control}
            rules={{ required: "Room number is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="roomNo"
                placeholder="Enter room number"
                className={`${CssStyling.textInput} ${
                  errors.roomNo ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.roomNo && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.roomNo.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="OldMeterReading" className={CssStyling.label}>
            Old Meter Reading *
          </label>
          <Controller
            name="OldMeterReading"
            control={control}
            rules={{ required: "Old meter reading is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="OldMeterReading"
                placeholder="Enter old meter reading"
                className={`${CssStyling.textInput} ${
                  errors.OldMeterReading ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.OldMeterReading && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.OldMeterReading.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="NewMeterReading" className={CssStyling.label}>
            New Meter Reading *
          </label>
          <Controller
            name="NewMeterReading"
            control={control}
            rules={{ required: "New meter reading is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="NewMeterReading"
                placeholder="Enter new meter reading"
                className={`${CssStyling.textInput} ${
                  errors.NewMeterReading ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.NewMeterReading && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.NewMeterReading.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="UnitUsed" className={CssStyling.label}>
            Units Used
          </label>
          <Controller
            name="UnitUsed"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="UnitUsed"
                value={calculateUnitUsed()}
                readOnly
                className={`${CssStyling.textInput} bg-gray-100`}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="BillAmount" className={CssStyling.label}>
            Bill Amount *
          </label>
          <Controller
            name="BillAmount"
            control={control}
            rules={{ required: "Bill amount is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="BillAmount"
                placeholder="Enter bill amount"
                className={`${CssStyling.textInput} ${
                  errors.BillAmount ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.BillAmount && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.BillAmount.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="PreviousBalance" className={CssStyling.label}>
            Previous Balance
          </label>
          <Controller
            name="PreviousBalance"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="PreviousBalance"
                placeholder="Enter previous balance"
                className={CssStyling.textInput}
              />
            )}
          />
        </div>
        
        <div>
          <label htmlFor="Rent" className={CssStyling.label}>
            Rent *
          </label>
          <Controller
            name="Rent"
            control={control}
            rules={{ required: "Rent is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="Rent"
                placeholder="Enter rent amount"
                className={`${CssStyling.textInput} ${
                  errors.Rent ? "border-danger-600" : ""
                }`}
              />
            )}
          />
          {errors.Rent && (
            <p className="text-danger-600 text-xs mt-1">
              {errors.Rent.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="TotalAmount" className={CssStyling.label}>
            Total Amount
          </label>
          <Controller
            name="TotalAmount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                value={calculateTotalAmount()}
                readOnly
                className={`${CssStyling.textInput} bg-gray-100`}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-primary-500 py-2 px-4 bg-purple-700 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Reciept;
