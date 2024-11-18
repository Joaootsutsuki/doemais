import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

const Picker = ({ value, onChange }) => {
  const datasIndisponiveis = [];

  const desabilitarData = (date) => {
    const isIndisponivel = datasIndisponiveis.includes(date.format("DD-MM-YYYY"));

    const foraDoPeriodo = date.isBefore(dayjs(), "day");

    return isIndisponivel || foraDoPeriodo;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <DatePicker
          label="Agendar Doação"
          defaultValue={dayjs()}
          format="DD-MM-YYYY"
          value={value || null}
          onChange={onChange}
          shouldDisableDate={desabilitarData}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default Picker;
