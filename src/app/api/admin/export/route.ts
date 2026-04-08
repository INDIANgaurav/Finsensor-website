import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

const HEADER_COLOR = "2E86AB"; // single clean teal

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const activeUsers = await User.find({}, "_id").lean();
    const activeUserIds = activeUsers.map((u) => u._id.toString());

    const forms = await PersonalInformation.find({ userId: { $in: activeUserIds } })
      .sort({ updatedAt: -1 })
      .lean();

    const clean = (val: unknown) =>
      val === "__other__" || val === undefined ? "" : String(val || "");

    const getStatusDetails = (f: typeof forms[number]) => {
      if (f.currentStatus === "Self employed in Business") return clean(f.selfEmployedDesc);
      if (f.currentStatus === "Employed in Job") return clean(f.employedInJobDesc);
      if (f.currentStatus === "Other") return clean(f.otherStatus);
      return "";
    };

    const headers = [
      "Profile ID", "First Name", "Middle Name", "Last Name", "Gender", "Date of Birth",
      "Mobile", "Email", "Country", "State", "City", "Pin Code",
      "Current Status", "Status Details", "Qualifications",
      "Software Knowledge", "Specialization", "Prior Work Experience",
      "Service Availability", "Geographic Coverage",
      "LinkedIn", "Form Status", "Submitted", "Updated",
    ];

    const wb = new ExcelJS.Workbook();
    wb.creator = "FinSensor";
    wb.created = new Date();

    const ws = wb.addWorksheet("FinSensor Connect", {
      views: [{ state: "frozen", ySplit: 1 }],
    });

    // Add header row
    ws.addRow(headers);

    // Style header row
    const headerRow = ws.getRow(1);
    headerRow.height = 28;
    headers.forEach((_key, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10, name: "Calibri" };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${HEADER_COLOR}` } };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: false };
      cell.border = {
        bottom: { style: "medium", color: { argb: "FFFFFFFF" } },
        right: { style: "thin", color: { argb: "33FFFFFF" } },
      };
    });

    // Add data rows
    forms.forEach((f, rowIdx) => {
      const values = [
        clean(f.profileId), clean(f.firstName), clean(f.middleName), clean(f.lastName),
        clean(f.gender), clean(f.dateOfBirth), clean(f.mobileNo), clean(f.emailId),
        clean(f.country), clean(f.state), clean(f.city), clean(f.pinCode),
        clean(f.currentStatus), getStatusDetails(f),
        (f.qualificationRows || []).filter((q: { checked: boolean }) => q.checked).map((q: { name: string }) => q.name).join(" / "),
        [...(f.softwareKnowledge || []), f.softwareOther].filter(Boolean).join(" / "),
        [...(f.specialization || []), f.specializationOther].filter(Boolean).join(" / "),
        [...(f.priorWorkExperience || []), f.priorWorkOther].filter(Boolean).join(" / "),
        [...(f.serviceAvailability || []), f.serviceOther].filter(Boolean).join(" / "),
        (f.geographicCoverage || []).join(" / "),
        f.linkedinUrl || "",
        f.status || "",
        f.createdAt ? new Date(f.createdAt).toLocaleDateString("en-IN") : "",
        f.updatedAt ? new Date(f.updatedAt).toLocaleDateString("en-IN") : "",
      ];

      const dataRow = ws.addRow(values);
      dataRow.height = 20;
      const isEven = rowIdx % 2 === 0;

      dataRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { size: 10, name: "Calibri", color: { argb: "FF1A1A2E" } };
        cell.fill = {
          type: "pattern", pattern: "solid",
          fgColor: { argb: isEven ? "FFF5F7FA" : "FFFFFFFF" },
        };
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: false };
        cell.border = {
          bottom: { style: "thin", color: { argb: "FFE0E0E0" } },
          right: { style: "thin", color: { argb: "FFE0E0E0" } },
        };
      });
    });

    // Auto column widths
    headers.forEach((key, i) => {
      const col = ws.getColumn(i + 1);
      const maxLen = Math.max(
        key.length,
        ...forms.map((f) => {
          const row = ws.getRow(forms.indexOf(f) + 2);
          return String(row.getCell(i + 1).value || "").length;
        })
      );
      col.width = Math.min(maxLen + 4, 40);
    });

    const buf = await wb.xlsx.writeBuffer();

    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="finsensor-connect-${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Export failed" }, { status: 500 });
  }
}
