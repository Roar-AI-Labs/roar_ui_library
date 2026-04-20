import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type ThemedLineChartDatum = Record<string, string | number>;

export type ThemedLineChartProps = {
  data: ThemedLineChartDatum[];
  /** Key on each datum for the X axis (default `name`). */
  xKey?: string;
  /** Key on each datum for the primary series (default `value`). */
  yKey?: string;
  /** Pixel height of the chart area (default 240). */
  height?: number;
};

type TooltipRow = { name?: string; value?: string | number };

function ThemedTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipRow[];
  label?: string;
}) {
  if (!active || payload == null || payload.length === 0) {
    return null;
  }
  const row = payload[0];
  return (
    <div
      className="rounded-[var(--rs-radius)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-3)] py-[var(--rs-space-2)] text-[length:var(--rs-text-sm)] shadow-[var(--rs-shadow-sm)]"
      style={{
        color: 'var(--rs-color-content)',
      }}
    >
      <div className="font-medium">{label}</div>
      <div className="text-[var(--rs-color-content-muted)]">
        {row?.name != null ? String(row.name) : ''}:{' '}
        <span className="font-semibold text-[var(--rs-color-content)]">
          {row?.value != null ? String(row.value) : ''}
        </span>
      </div>
    </div>
  );
}

/**
 * Single-series line chart using `--rs-*` stroke, grid, and axis colors.
 */
export function ThemedLineChart({
  data,
  xKey = 'name',
  yKey = 'value',
  height = 240,
}: ThemedLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          stroke="var(--rs-color-border)"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={{ fill: 'var(--rs-color-content-muted)', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'var(--rs-color-border)' }}
        />
        <YAxis
          tick={{ fill: 'var(--rs-color-content-muted)', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'var(--rs-color-border)' }}
        />
        <Tooltip content={<ThemedTooltip />} />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="var(--rs-color-primary)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: 'var(--rs-color-primary)' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
