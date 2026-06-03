import { BookOpen, Clock, MapPin } from 'lucide-react';

const SCHEDULE = [
  { time: '08:30 AM', subject: 'Mathematics', teacher: 'Ms. Priya', room: 'Room 201' },
  { time: '09:25 AM', subject: 'Science', teacher: 'Mr. Khan', room: 'Lab 2' },
  { time: '10:20 AM', subject: 'English', teacher: 'Ms. Nair', room: 'Room 105' },
  { time: '11:30 AM', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 204' },
];

const TodaySchedule = (): React.ReactElement => {
  return (
    <section className="today-schedule" aria-labelledby="today-schedule-title">
      <div className="schedule-header">
        <div>
          <h3 id="today-schedule-title">Today's Schedule</h3>
          <p>Stay prepared for your upcoming classes.</p>
        </div>
        <Clock size={22} />
      </div>

      <div className="schedule-list">
        {SCHEDULE.map(item => (
          <article className="schedule-item" key={`${item.time}-${item.subject}`}>
            <div className="schedule-time">{item.time}</div>
            <div className="schedule-subject"><BookOpen size={17} /> {item.subject}</div>
            <div className="schedule-meta"><span>{item.teacher}</span><span><MapPin size={14} /> {item.room}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodaySchedule;
