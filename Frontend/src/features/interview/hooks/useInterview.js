import { useContext } from 'react';
import { InterviewContext } from '../interview.context.jsx';
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf,
} from '../services/interview.api.js';

export function useInterview() {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async (input) => {
    const response = await generateInterviewReport(input);
    return response.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    const response = await getAllInterviewReports();
    setReports(response.interviewReports);
    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    const blob = await generateResumePdf({ interviewReportId });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_${interviewReportId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf };
}
