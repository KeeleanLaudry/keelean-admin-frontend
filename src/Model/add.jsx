import React from "react";
import { X } from "lucide-react";

const AddModal = ({
  title = "Add Service",
  FormComponent,
  formRef,
  formProps = {},
  onSave,
  onClose,
  saveLabel = "Add",
}) => {
  const handleSave = () => {
    const data = formRef?.current?.getData?.();
    if (!data) return;
    onSave?.(data);
  };

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {FormComponent && (
            <FormComponent ref={formRef} {...formProps} />
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
