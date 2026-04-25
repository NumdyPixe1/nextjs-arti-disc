import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    placeholder?: string;
    type?: string;
    id?: string;
    isTextArea?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, Props>(
    ({ label, placeholder, type = "text", id, isTextArea, className, ...props }, ref) => {
        const inputClass: string = " rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        return (<>
            <div className="grid gap-2" >
                <label className="text-sm font-medium text-slate-700" > {label} </label>
                {isTextArea ? (<textarea
                    ref={ref}
                    className={inputClass}
                    id={id}
                    placeholder={placeholder}
                    rows={3}
                    {...props}
                />)
                    : (<input
                        ref={ref}
                        className={inputClass}
                        id={id} type={type}
                        placeholder={placeholder}
                        {...props}
                    />)
                }
            </div>
        </>)
    });