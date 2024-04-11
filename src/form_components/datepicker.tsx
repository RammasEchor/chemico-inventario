import { es } from "date-fns/locale/es";
import DatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
registerLocale("es", es);

interface DatepickerProps extends ReactDatePickerProps {
    label?: string,
    selected: Date | null,
    onChange: (date: Date) => void
}

function DatePickerField({ label, selected, onChange, ...rest }: DatepickerProps) {
    return (
        <>
            <label className="is-size-5" htmlFor={label}>{label}</label>
            <DatePicker
                className="input is-info mb-3"
                selected={selected}
                onChange={(date: Date) => onChange(date)}
                dateFormat="dd/MMM/yyyy"
                locale="es"
                {...rest}
            />
        </>
    );
};

export default DatePickerField