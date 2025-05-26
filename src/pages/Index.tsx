import { useState } from "react";
import {
  Search,
  Star,
  ExternalLink,
  Users,
  Zap,
  Globe,
  Gift,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description: string;
  category: "nodes" | "depin" | "mainnet" | "airdrop";
  status: "active" | "upcoming" | "ended";
  participants: string;
  reward: string;
  endDate: string;
  difficulty: "easy" | "medium" | "hard";
  links: {
    website?: string;
    discord?: string;
    twitter?: string;
  };
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Celestia Node",
    description:
      "Запустите light node в сети Celestia и получите награды за участие в модульном блокчейне",
    category: "nodes",
    status: "active",
    participants: "15.2K",
    reward: "500-2000 TIA",
    endDate: "31 мая 2024",
    difficulty: "medium",
    links: {
      website: "https://celestia.org",
      discord: "https://discord.gg/celestia",
      twitter: "https://twitter.com/celestiaorg",
    },
    tags: ["modular", "da-layer", "cosmos"],
  },
  {
    id: "2",
    name: "Helium Mobile",
    description:
      "Участвуйте в DePIN сети мобильной связи, устанавливайте hotspot и зарабатывайте MOBILE токены",
    category: "depin",
    status: "active",
    participants: "8.7K",
    reward: "10-100 MOBILE",
    endDate: "Бессрочно",
    difficulty: "easy",
    links: {
      website: "https://helium.com",
      discord: "https://discord.gg/helium",
      twitter: "https://twitter.com/helium",
    },
    tags: ["5g", "iot", "mobile"],
  },
  {
    id: "3",
    name: "Berachain Testnet",
    description:
      "Тестируйте экосистему Berachain, выполняйте задания и получайте BGT токены в тестнете",
    category: "mainnet",
    status: "active",
    participants: "45.1K",
    reward: "BGT Points",
    endDate: "15 июня 2024",
    difficulty: "easy",
    links: {
      website: "https://berachain.com",
      discord: "https://discord.gg/berachain",
      twitter: "https://twitter.com/berachain",
    },
    tags: ["evm", "pos", "defi"],
  },
  {
    id: "4",
    name: "Grass Airdrop",
    description:
      "Установите расширение Grass и продавайте неиспользуемый интернет-трафик за токены",
    category: "airdrop",
    status: "active",
    participants: "125K",
    reward: "GRASS Tokens",
    endDate: "TBA",
    difficulty: "easy",
    links: {
      website: "https://getgrass.io",
      discord: "https://discord.gg/grass",
      twitter: "https://twitter.com/getgrass_io",
    },
    tags: ["bandwidth", "passive", "browser"],
  },
  {
    id: "5",
    name: "Ritual Network",
    description:
      "Участвуйте в тестнете AI-инфраструктуры Ritual для децентрализованного машинного обучения",
    category: "nodes",
    status: "upcoming",
    participants: "2.3K",
    reward: "100-500 RITE",
    endDate: "10 июня 2024",
    difficulty: "hard",
    links: {
      website: "https://ritual.net",
      discord: "https://discord.gg/ritual",
      twitter: "https://twitter.com/ritualnet",
    },
    tags: ["ai", "ml", "infra"],
  },
  {
    id: "6",
    name: "Filecoin Storage",
    description:
      "Станьте поставщиком хранилища в сети Filecoin и зарабатывайте FIL за предоставление дискового пространства",
    category: "depin",
    status: "active",
    participants: "3.2K",
    reward: "5-50 FIL",
    endDate: "Бессрочно",
    difficulty: "hard",
    links: {
      website: "https://filecoin.io",
      discord: "https://discord.gg/filecoin",
      twitter: "https://twitter.com/filecoin",
    },
    tags: ["storage", "ipfs", "web3"],
  },
];

const categories = [
  { id: "all", name: "Все проекты", icon: Globe, count: mockProjects.length },
  {
    id: "nodes",
    name: "Ноды",
    icon: Zap,
    count: mockProjects.filter((p) => p.category === "nodes").length,
  },
  {
    id: "depin",
    name: "DePIN",
    icon: Users,
    count: mockProjects.filter((p) => p.category === "depin").length,
  },
  {
    id: "mainnet",
    name: "Майнет/Тестнет",
    icon: Globe,
    count: mockProjects.filter((p) => p.category === "mainnet").length,
  },
  {
    id: "airdrop",
    name: "Аирдропы",
    icon: Gift,
    count: mockProjects.filter((p) => p.category === "airdrop").length,
  },
];

const statusColors = {
  active: "bg-green-500",
  upcoming: "bg-blue-500",
  ended: "bg-gray-500",
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">
                🚀 CryptoTracker
              </h1>
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Поиск проектов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Категории проектов
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-xs opacity-70">
                    {category.count} проектов
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white">
                {filteredProjects.length}
              </div>
              <div className="text-sm text-slate-400">Найдено проектов</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">
                {filteredProjects.filter((p) => p.status === "active").length}
              </div>
              <div className="text-sm text-slate-400">Активных</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">
                {filteredProjects.filter((p) => p.status === "upcoming").length}
              </div>
              <div className="text-sm text-slate-400">Скоро</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-slate-400">Возможностей</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-800 border-slate-600 hover:bg-slate-750 transition-all duration-200 hover:scale-105 hover:shadow-lg group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </CardTitle>
                    <div
                      className={`w-2 h-2 rounded-full ${statusColors[project.status]}`}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-slate-300">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Участников</div>
                      <div className="text-white font-medium">
                        {project.participants}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Награда</div>
                      <div className="text-green-400 font-medium">
                        {project.reward}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Окончание</div>
                      <div className="text-white font-medium">
                        {project.endDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Сложность</div>
                      <Badge className={difficultyColors[project.difficulty]}>
                        {project.difficulty === "easy"
                          ? "Легко"
                          : project.difficulty === "medium"
                            ? "Средне"
                            : "Сложно"}
                      </Badge>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-slate-600 text-slate-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-2">
                    {project.links.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:text-white"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Сайт
                      </Button>
                    )}
                    {project.links.discord && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:text-white"
                      >
                        Discord
                      </Button>
                    )}
                    {project.links.twitter && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:text-white"
                      >
                        Twitter
                      </Button>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Начать участие
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">Проекты не найдены</div>
            <div className="text-slate-500 text-sm mt-2">
              Попробуйте изменить фильтры поиска
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
