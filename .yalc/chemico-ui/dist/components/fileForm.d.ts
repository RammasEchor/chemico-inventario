import * as React from 'react';
interface FileFormInterface {
    onChange: ({ file, filename }: {
        file: File;
        filename: string;
    }) => void;
}
declare function FileForm(props: FileFormInterface): React.JSX.Element;
export { FileForm };
