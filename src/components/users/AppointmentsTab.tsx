import { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Stethoscope } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { Modal } from '../shared/Modal';

// Legacy local types — no longer importing from types/index.ts
type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';
type AppointmentType = 'consultation' | 'checkup' | 'follow-up' | 'telehealth';

interface Props { userId: string; }

const APPT_TYPES: AppointmentType[] = ['consultation', 'checkup', 'follow-up', 'telehealth'];
const DOCTORS = [
  { name: 'Dr. Arvind Sharma', specialty: 'Cardiologist' },
  { name: 'Dr. Priya Nair', specialty: 'General Physician' },
  { name: 'Dr. Rohan Gupta', specialty: 'Dermatologist' },
  { name: 'Dr. Mala Krishnan', specialty: 'Orthopedist' },
  { name: 'Dr. Sanjay Mehta', specialty: 'Neurologist' },
  { name: 'Dr. Anita Patel', specialty: 'Gynecologist' },
];

export function AppointmentsTab({ userId }: Props) {
  const { appointments, addAppointment, updateAppointment } = useStore();
  const userAppointments = appointments.filter((a) => a.userId === userId);
  const user = useStore.getState().users.find((u) => u.id === userId);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    doctorIndex: '0', type: 'consultation' as AppointmentType,
    status: 'scheduled' as AppointmentStatus,
    date: '', time: '10:00 AM', notes: '', location: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = DOCTORS[Number(form.doctorIndex)];
    addAppointment({
      userId,
      userName: user?.name ?? '',
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      type: form.type,
      status: form.status,
      date: form.date,
      time: form.time,
      notes: form.notes || undefined,
      location: form.location || undefined,
    });
    setForm({ doctorIndex: '0', type: 'consultation', status: 'scheduled', date: '', time: '10:00 AM', notes: '', location: '' });
    setShowModal(false);
  };

  const scheduled = userAppointments.filter((a) => a.status === 'scheduled');
  const past = userAppointments.filter((a) => a.status !== 'scheduled');

  return (
    <>
      <Card noPad>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900">Appointments</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="text-[#16A34A] font-semibold">{scheduled.length}</span> upcoming · {past.length} past
            </p>
          </div>
          <button
            id="btn-add-appointment"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Schedule
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {userAppointments.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No appointments found.</div>
          ) : (
            userAppointments.map((appt) => (
              <div key={appt.id} id={`appt-row-${appt.id}`} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Stethoscope className="w-4.5 h-4.5 text-[#2D7A3A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-900">{appt.doctorName}</p>
                      <Badge variant={appt.type} />
                      <Badge variant={appt.status} dot />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{appt.doctorSpecialty}</p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(appt.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {appt.time}
                      </div>
                      {appt.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {appt.location}
                        </div>
                      )}
                    </div>
                    {appt.notes && (
                      <p className="text-xs text-gray-400 mt-1.5 italic">{appt.notes}</p>
                    )}
                  </div>
                  {appt.status === 'scheduled' && (
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        id={`btn-complete-appt-${appt.id}`}
                        onClick={() => updateAppointment(appt.id, { status: 'completed' })}
                        className="px-2 py-1 text-xs font-medium text-[#16A34A] border border-[#16A34A]/30 rounded-lg hover:bg-[#F0FDF4] transition-colors"
                      >Complete</button>
                      <button
                        id={`btn-cancel-appt-${appt.id}`}
                        onClick={() => updateAppointment(appt.id, { status: 'cancelled' })}
                        className="px-2 py-1 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Schedule Appointment" size="lg" id="modal-add-appointment">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Doctor <span className="text-red-400">*</span></label>
            <select
              id="select-appt-doctor"
              value={form.doctorIndex}
              onChange={(e) => setForm({ ...form, doctorIndex: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
            >
              {DOCTORS.map((d, i) => (
                <option key={i} value={String(i)}>{d.name} — {d.specialty}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Type</label>
              <select
                id="select-appt-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as AppointmentType })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                {APPT_TYPES.map((t) => (
                  <option key={t} value={t}>{t.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
              <select
                id="select-appt-status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as AppointmentStatus })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date <span className="text-red-400">*</span></label>
              <input
                id="input-appt-date"
                required type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Time</label>
              <input
                id="input-appt-time"
                type="text"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="e.g. 10:00 AM"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Location</label>
            <input
              id="input-appt-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Jiva Clinic, Mumbai"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Notes</label>
            <textarea
              id="input-appt-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" id="btn-submit-appointment" className="px-5 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800">Schedule</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
