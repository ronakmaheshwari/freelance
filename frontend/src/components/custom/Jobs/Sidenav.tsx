import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Sidenav = () => {
  return (
    <aside className="w-full max-w-[380px] p-10 bg-white border-r rounded-2xl shadow-md space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-2xl font-medium mb-2 block">Search</Label>
        <Input id="search" placeholder="Job title or company" />
      </div>

      <Separator />

      {/* Job Type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Job Type</Label>
        <div className="space-y-3 pl-1">
          {["Full-time", "Part-time", "Internship", "Freelance"].map((type) => (
            <div className="flex items-center space-x-2" key={type}>
              <Checkbox id={type.toLowerCase()} />
              <Label htmlFor={type.toLowerCase()}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Experience */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Experience</Label>
        <div className="space-y-3 pl-1">
          {[
            { id: "fresher", label: "Fresher" },
            { id: "exp-1-3", label: "1–3 years" },
            { id: "exp-3-5", label: "3–5 years" },
            { id: "exp-5-plus", label: "5+ years" },
          ].map(({ id, label }) => (
            <div className="flex items-center space-x-2" key={id}>
              <Checkbox id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Work Mode */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Work Mode</Label>
        <div className="space-y-3 pl-1">
          {["Remote", "On-site", "Hybrid"].map((mode) => (
            <div className="flex items-center space-x-2" key={mode}>
              <Checkbox id={mode.toLowerCase()} />
              <Label htmlFor={mode.toLowerCase()}>{mode}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Salary Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Salary Range (in LPA)</Label>
        <Slider defaultValue={[6]} max={40} step={2} />
        <p className="text-xs text-muted-foreground mt-2">Min: ₹6LPA</p>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <Button variant="default" className="w-full bg-blue-600">Apply Filters</Button>
        <Button variant="outline" className="w-full">Clear All</Button>
      </div>
    </aside>
  )
}

export default Sidenav
