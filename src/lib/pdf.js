import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function downloadPDF(elementRef, estimateNumber, clientName) {
  const el = elementRef.current
  if (!el) return

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgWidth = 210
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  let y = 0
  const pageHeight = 297

  while (y < imgHeight) {
    if (y > 0) pdf.addPage()
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      -y,
      imgWidth,
      imgHeight
    )
    y += pageHeight
  }

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
  const safeName = (clientName || 'Client').replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-')
  pdf.save(`${safeName}-Estimate-${today}.pdf`)
}
