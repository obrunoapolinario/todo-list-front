type LabelProps = {} & React.HTMLProps<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ ...props }) => {
    return (
        <label
            className="block text-sm font-medium mb-2 dark:text-white"
            {...props}
        >
            {props.children}
        </label>
    )
}