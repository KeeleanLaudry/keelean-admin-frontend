import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";

const defaultTypes = ["Laundry", "DryClean", "SpecialCare"];

const slugify = (text) =>
  text?.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const generateCode = (name) =>
  name
    ?.toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 3);

const ServiceForm = forwardRef(
  ({ data = {}, serviceTypes = defaultTypes, onSave, onCancel }, ref) => {
    const [form, setForm] = useState({
      id: data.id || null,
      service_name: data.service_name || "",
      slug: data.slug || "",
      service_code: data.service_code || "",
      service_type: data.service_type || "",
      turnaround_days: data.turnaround_days || "",
      base_price: data.base_price || "",
      badge: data.badge || "",
      image: data.image || "",
      short_description: data.short_description || "",
      long_description: data.long_description || "",
      status: data.status ?? 1,
    });

    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(form.image);
    const [isNew, setIsNew] = useState(!data.id);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    useEffect(() => {
      if (isNew && form.service_name) {
        setForm((f) => ({
          ...f,
          slug: slugify(f.service_name),
          service_code: f.service_code || generateCode(f.service_name),
        }));
      }
    }, [form.service_name, isNew]);

    useEffect(() => setPreview(form.image), [form.image]);

    const validateForm = () => {
      const e = {};
      if (!form.service_name) e.service_name = "Required";
      if (!form.service_type) e.service_type = "Required";
      if (!form.base_price || form.base_price <= 0) e.base_price = "Invalid";
      setErrors(e);
      return Object.keys(e).length === 0;
    };

    const handleSave = () => {
      if (validateForm()) {
        onSave?.(form);
      }
    };

    const resetForm = () => {
      setForm({
        id: null,
        service_name: "",
        slug: "",
        service_code: "",
        service_type: "",
        turnaround_days: "",
        base_price: "",
        badge: "",
        image: "",
        short_description: "",
        long_description: "",
        status: 1,
      });
      setErrors({});
      setPreview("");
      setIsNew(true);
    };

    useImperativeHandle(ref, () => ({
      getData: () => form,
      validate: validateForm,
      reset: resetForm,
    }));

    // Image-style UI with gray colors
    const styles = {
      container: "grid grid-cols-1 md:grid-cols-2 gap-6 p-4",
      leftPanel: "space-y-4",
      rightPanel: "space-y-4",
      fieldGroup: "space-y-2",
      label: "block text-xs font-medium text-gray-600",
      value: "text-sm text-gray-900",
      input: "w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 \
   focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 \
   outline-none transition text-sm text-gray-800 placeholder-gray-400",
      select: "w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 \
   focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 \
   outline-none transition text-sm text-gray-800 placeholder-gray-400",
      textarea: "w-full px-3 py-2  border border-gray-300 bg-gray-50 \ focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 \
   outline-none transition text-sm text-gray-800 placeholder-gray-400",
      divider: "border-t border-gray-100 my-4",
      badge: "inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded",
      sectionTitle: "text-sm font-medium text-gray-700 mb-3",
    };

    return (
      <div className={styles.container}>
{/* Image */}
{/* IMAGE ROW — FULL WIDTH CENTER */}
<div className="md:col-span-2 flex flex-col items-center gap-3 pb-2 border-b border-gray-100">
  <label className="text-xs font-medium text-gray-600">Service Image</label>

  <div className="flex items-center gap-3">
    <input
      id="service-image"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;
        set("image", URL.createObjectURL(file));
      }}
    />

    <label
      htmlFor="service-image"
      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md cursor-pointer hover:bg-gray-200"
    >
      {form.image ? "Change Image" : "Upload Image"}
    </label>

    {form.image && (
      <button
        type="button"
        onClick={() => set("image", "")}
        className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-md hover:bg-gray-100"
      >
        Remove
      </button>
    )}
  </div>

  {form.image && (
    <img
      src={form.image}
      alt="preview"
      className="w-40 h-28 object-cover rounded-md border border-gray-200"
    />
  )}
</div>           <div className={styles.leftPanel}>
          {/* Service Name */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Service Name</label>
           <input
              type="text"
              value={form.service_name}
              onChange={(e) => set("service_name", e.target.value)}
              className={styles.input}
              placeholder=""
            />
          </div>

          {/* Short Description */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Short Description</label>
            <textarea
              value={form.short_description}
              onChange={(e) => set("short_description", e.target.value)}
              className={styles.textarea}
              rows={2}
              placeholder="Regular washing and folding"
            />
          </div>

          {/* Service Type */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Service Type</label>
            <select
              value={form.service_type}
              onChange={(e) => set("service_type", e.target.value)}
              className={styles.select}
            >
              <option value="">Select</option>
              {serviceTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Turnaround Days */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Turnaround Days</label>
            <input
              type="number"
              value={form.turnaround_days}
              onChange={(e) => set("turnaround_days", e.target.value)}
              className={styles.input}
              placeholder="2"
            />
          </div>

          {/* Status */}
         
        </div>

        {/* RIGHT PANEL - Display Fields */}
        <div className={styles.rightPanel}>
          {/* Code */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Code</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">WF</span>
              <span className={styles.input}>Auto</span>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-500">AED</span>
              <input
                type="number"
                value={form.base_price}
                onChange={(e) => set("base_price", e.target.value)}
                className={`${styles.input} pl-12`}
                placeholder="79"
              />
            </div>
          </div>

          {/* Badge */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Badge</label>
            <input
              value={form.badge}
              onChange={(e) => set("badge", e.target.value)}
              className={styles.input}
              placeholder="Popular"
            />
          </div>
           <div className={styles.fieldGroup}>
            <label className={styles.label}>Status</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.status === 1}
                  onChange={() => set("status", 1)}
                  className="text-gray-600"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.status === 0}
                  onChange={() => set("status", 0)}
                  className="text-gray-600"
                />
                <span className="text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ServiceForm;