'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">atlas-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' : 'data-target="#xs-components-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' :
                                            'id="xs-components-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' }>
                                            <li class="link">
                                                <a href="components/AdministrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreaDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuditsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuditsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompaniesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompaniesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MethodologiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MethodologiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VulnerabilitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VulnerabilitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VulnerabilityDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VulnerabilityDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' : 'data-target="#xs-injectables-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' :
                                        'id="xs-injectables-links-module-AppModule-bd428033bf517fbae452ec9cd487b43e"' }>
                                        <li class="link">
                                            <a href="injectables/AreaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AreaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CompanyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppConstants.html" data-type="entity-link">AppConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertsService.html" data-type="entity-link">AlertsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AreaService.html" data-type="entity-link">AreaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetService.html" data-type="entity-link">AssetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuditService.html" data-type="entity-link">AuditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link">CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MethodologiesService.html" data-type="entity-link">MethodologiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfilesService.html" data-type="entity-link">ProfilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VulnerabilitiesService.html" data-type="entity-link">VulnerabilitiesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Area.html" data-type="entity-link">Area</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Asset.html" data-type="entity-link">Asset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Audit.html" data-type="entity-link">Audit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body.html" data-type="entity-link">Body</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body1.html" data-type="entity-link">Body1</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body10.html" data-type="entity-link">Body10</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body11.html" data-type="entity-link">Body11</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body12.html" data-type="entity-link">Body12</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body13.html" data-type="entity-link">Body13</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body14.html" data-type="entity-link">Body14</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body15.html" data-type="entity-link">Body15</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body16.html" data-type="entity-link">Body16</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body17.html" data-type="entity-link">Body17</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body18.html" data-type="entity-link">Body18</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body19.html" data-type="entity-link">Body19</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body2.html" data-type="entity-link">Body2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body20.html" data-type="entity-link">Body20</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body3.html" data-type="entity-link">Body3</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body4.html" data-type="entity-link">Body4</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body5.html" data-type="entity-link">Body5</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body6.html" data-type="entity-link">Body6</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body7.html" data-type="entity-link">Body7</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body8.html" data-type="entity-link">Body8</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Body9.html" data-type="entity-link">Body9</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Company.html" data-type="entity-link">Company</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Company-1.html" data-type="entity-link">Company</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link">Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link">Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Functionality.html" data-type="entity-link">Functionality</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InlineResponse401.html" data-type="entity-link">InlineResponse401</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Integration.html" data-type="entity-link">Integration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Methodology.html" data-type="entity-link">Methodology</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewArea.html" data-type="entity-link">NewArea</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCompany.html" data-type="entity-link">NewCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewProfile.html" data-type="entity-link">NewProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewUser.html" data-type="entity-link">NewUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link">Profile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Responsable.html" data-type="entity-link">Responsable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Test.html" data-type="entity-link">Test</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Url.html" data-type="entity-link">Url</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vulnerability.html" data-type="entity-link">Vulnerability</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});