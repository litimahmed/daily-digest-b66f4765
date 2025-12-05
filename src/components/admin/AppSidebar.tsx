import { useState } from "react";
import { LayoutDashboard, Users, Settings, BarChart3, Zap, FileText, ChevronDown, Info, Phone, Handshake, Eye, Plus, Layers, Shield, Ban, FolderTree, Briefcase, UserCog } from "lucide-react";
import { useContacts } from "@/hooks/admin/useContacts";
import { NavLink } from "@/components/admin/NavLink";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manage Queues", url: "/admin/manage", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { contact } = useContacts();
  const isActive = (path: string) => currentPath === path;
  const isPathStartsWith = (path: string) => currentPath.startsWith(path);
  
  const isContentActive = isPathStartsWith("/admin/about-us") || isPathStartsWith("/admin/contacts") || isPathStartsWith("/admin/partners") || isPathStartsWith("/admin/terms") || isPathStartsWith("/admin/privacy-policy");
  const isAboutUsActive = isPathStartsWith("/admin/about-us");
  const isContactActive = isPathStartsWith("/admin/contacts");
  const isPartnersActive = isPathStartsWith("/admin/partners");
  const isTermsActive = isPathStartsWith("/admin/terms");
  const isPrivacyActive = isPathStartsWith("/admin/privacy-policy");
  const isCategoriesActive = isPathStartsWith("/admin/categories");
  const isServicesActive = isPathStartsWith("/admin/services");
  const isProfessionalsActive = isPathStartsWith("/admin/professionals");
  
  const [contentOpen, setContentOpen] = useState(true);
  const [aboutUsOpen, setAboutUsOpen] = useState(isAboutUsActive);
  const [contactOpen, setContactOpen] = useState(isContactActive);
  const [partnersOpen, setPartnersOpen] = useState(isPartnersActive);
  const [termsOpen, setTermsOpen] = useState(isTermsActive);
  const [privacyOpen, setPrivacyOpen] = useState(isPrivacyActive);
  const [categoriesOpen, setCategoriesOpen] = useState(isCategoriesActive);
  const [servicesOpen, setServicesOpen] = useState(isServicesActive);
  const [professionalsOpen, setProfessionalsOpen] = useState(isProfessionalsActive);

  return (
    <Sidebar 
      className={`${open ? "w-64" : "w-16"} transition-all duration-300 border-r-0 shadow-[var(--shadow-sidebar)]`} 
      collapsible="icon"
    >
      <SidebarContent className="bg-[hsl(var(--sidebar-background))] h-full">
        {/* Logo Section */}
        <div className={`${open ? "px-5 py-5" : "px-3 py-5"} transition-all duration-300`}>
          <div className={`flex items-center ${open ? "gap-3" : "justify-center"}`}>
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150" />
              <div className="relative bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            {open && (
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-foreground tracking-tight">Toorrii</h1>
                <span className="text-[11px] text-muted-foreground font-medium -mt-0.5">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation Section */}
        <SidebarGroup className="px-3 py-2">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1">
              Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {mainItems.map(item => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`
                          ${open ? "px-3 py-2.5" : "px-2 py-2.5 justify-center"}
                          rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center gap-3
                          group relative
                        `}
                        activeClassName={`
                          bg-primary text-primary-foreground font-medium
                          shadow-sm shadow-primary/20
                          hover:bg-primary hover:text-primary-foreground
                        `}
                      >
                        <item.icon className={`h-[18px] w-[18px] flex-shrink-0 transition-transform group-hover:scale-105 ${active ? "text-primary-foreground" : ""}`} />
                        {open && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Management Section */}
        <SidebarGroup className="px-3 py-2">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1">
              Content
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {open ? (
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isContentActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-[18px] w-[18px] ${isContentActive ? "text-primary" : ""}`} />
                          <span className="text-sm">Content</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-0.5 space-y-0.5">
                    {/* About Us Menu */}
                    <Collapsible open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              ml-3 px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isAboutUsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-2.5">
                              <Info className={`h-4 w-4 ${isAboutUsActive ? "text-primary" : ""}`} />
                              <span>About Us</span>
                            </div>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutUsOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-0.5 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/versions"
                              end
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Layers className="h-3.5 w-3.5" />
                              <span>All Versions</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/about-us/create"
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Create New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Contact Menu */}
                    <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              ml-3 px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isContactActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-2.5">
                              <Phone className={`h-4 w-4 ${isContactActive ? "text-primary" : ""}`} />
                              <span>Contact</span>
                            </div>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-0.5 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/contacts"
                              end
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Contact</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild={!contact}>
                            {contact ? (
                              <div className="ml-6 px-3 py-1.5 rounded-md flex items-center gap-2.5 text-[13px] text-muted-foreground/50 cursor-not-allowed w-[calc(100%-24px)]">
                                <Ban className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </div>
                            ) : (
                              <NavLink
                                to="/admin/contacts/create"
                                className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                                activeClassName="bg-primary/10 text-primary font-medium"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span>Add Contact</span>
                              </NavLink>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Partners Menu */}
                    <Collapsible open={partnersOpen} onOpenChange={setPartnersOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              ml-3 px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isPartnersActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-2.5">
                              <Handshake className={`h-4 w-4 ${isPartnersActive ? "text-primary" : ""}`} />
                              <span>Partners</span>
                            </div>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${partnersOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-0.5 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners"
                              end
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Partners</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/partners/create"
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add Partner</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Terms and Conditions Menu */}
                    <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              ml-3 px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isTermsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-2.5">
                              <Shield className={`h-4 w-4 ${isTermsActive ? "text-primary" : ""}`} />
                              <span>Terms</span>
                            </div>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${termsOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-0.5 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms-and-conditions"
                              end
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Terms</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/terms-and-conditions/create"
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Create New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Privacy Policy Menu */}
                    <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={`
                              ml-3 px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isPrivacyActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                            `}
                          >
                            <div className="flex items-center gap-2.5">
                              <Shield className={`h-4 w-4 ${isPrivacyActive ? "text-primary" : ""}`} />
                              <span>Privacy</span>
                            </div>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${privacyOpen ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-0.5 space-y-0.5">
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy"
                              end
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Policies</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to="/admin/privacy-policy/create"
                              className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Create New</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CollapsibleContent>
                    </Collapsible>

                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/about-us/versions"
                      className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                      activeClassName="bg-primary text-primary-foreground"
                    >
                      <FileText className="h-[18px] w-[18px]" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories Section */}
        <SidebarGroup className="px-3 py-2">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1">
              Categories
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {open ? (
                <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isCategoriesActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FolderTree className={`h-[18px] w-[18px] ${isCategoriesActive ? "text-primary" : ""}`} />
                          <span className="text-sm">Categories</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-0.5 space-y-0.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/categories"
                          end
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Categories</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/categories/create"
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Category</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/categories"
                      className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                      activeClassName="bg-primary text-primary-foreground"
                    >
                      <FolderTree className="h-[18px] w-[18px]" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Services Section */}
        <SidebarGroup className="px-3 py-2">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1">
              Services
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {open ? (
                <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isServicesActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Briefcase className={`h-[18px] w-[18px] ${isServicesActive ? "text-primary" : ""}`} />
                          <span className="text-sm">Services</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-0.5 space-y-0.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/services"
                          end
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Services</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/services/create"
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Service</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/services"
                      className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                      activeClassName="bg-primary text-primary-foreground"
                    >
                      <Briefcase className="h-[18px] w-[18px]" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Professionals Section */}
        <SidebarGroup className="px-3 py-2">
          {open && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1">
              Professionals
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {open ? (
                <Collapsible open={professionalsOpen} onOpenChange={setProfessionalsOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isProfessionalsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <UserCog className={`h-[18px] w-[18px] ${isProfessionalsActive ? "text-primary" : ""}`} />
                          <span className="text-sm">Professionals</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${professionalsOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-0.5 space-y-0.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/professionals"
                          end
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Professionals</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to="/admin/professionals/create"
                          className="ml-6 px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)]"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Professional</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/professionals"
                      className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                      activeClassName="bg-primary text-primary-foreground"
                    >
                      <UserCog className="h-[18px] w-[18px]" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <SidebarFooter className="mt-auto p-3 border-t border-sidebar-border">
          {open ? (
            <div className="px-3 py-2">
              <p className="text-[10px] text-muted-foreground/60 font-medium">Toorrii Admin v1.0</p>
            </div>
          ) : null}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
